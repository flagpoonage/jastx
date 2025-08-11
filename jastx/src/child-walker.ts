import { createTextNode } from "./builders/text-node.js";
import { InvalidSyntaxError } from "./errors.js";
import { AstNode, ElementType } from "./types.js";
import { asArray } from "./utils.js";

interface AssertGroupOptions {
  allowText?: boolean;
  size?: [number | undefined, number | undefined];
}

export function createChildWalker(
  parentType: ElementType,
  props: { children?: any }
) {
  const og_children = Array.isArray(props?.children) ? props.children : [];
  const children = [...og_children];
  const indexOf = (node: any) => og_children.indexOf(node);

  const walker = {
    get remainingChildren() {
      return children;
    },

    get remainingChildTypes() {
      return Array.from(
        new Set(
          children.map((a) => {
            if (typeof a === "string") {
              return `<text [${a}]>`;
            }

            return a.type;
          })
        )
      );
    },

    spliceAssertGroup: (
      type: ElementType | ElementType[],
      options?: AssertGroupOptions
    ): AstNode[] => {
      const { size = [0, Infinity], allowText = false } = options ?? {};

      const [min, max] = [
        typeof size[0] === "number" ? Math.max(0, size[0]) : 0,
        typeof size[1] === "number" ? Math.max(0, size[1]) : Infinity,
      ];

      const group = [];
      const search_types = Array.isArray(type) ? type : [type];

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (typeof child === "string") {
          if (allowText) {
            const text = children.splice(i, 1)[0] as string;
            group.push(createTextNode({ value: text }));
            i--;
            continue;
          }

          throw new InvalidSyntaxError(
            `<${parentType}> unexpected text node at position [${indexOf(
              child
            )}]`
          );
        }

        if (!child || !("type" in child)) {
          continue;
        }

        if (!search_types.includes(child.type)) {
          continue;
        }

        group.push(children.splice(i, 1)[0]);
        i--;

        if (group.length > max) {
          throw new InvalidSyntaxError(
            `<${parentType}> is not allowed more than [${max}] elements of type:\n${search_types
              .map((a) => `- <${a}>`)
              .join("\n")}`
          );
        }
      }

      if (group.length < min) {
        throw new InvalidSyntaxError(
          `<${parentType}> requires at least [${min}] elements of type:\n${search_types
            .map((a) => `- <${a}>`)
            .join("\n")}\n but only [${group.length}] were found`
        );
      }

      return group;
    },

    spliceAssertOneof: (
      types: readonly ElementType[],
      maxAllowed: number = Infinity
    ): AstNode => {
      let count = 0;
      let single: AstNode | undefined;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child || !("type" in child)) {
          continue;
        }

        if (!types.includes(child.type)) {
          continue;
        }

        if (!single) {
          single = children.splice(i, 1)[0];
          i--;

          if (maxAllowed === Infinity) {
            break;
          }
        }

        count++;

        if (count > maxAllowed) {
          throw new InvalidSyntaxError(
            `<${parentType}> is not allowed more than [${maxAllowed}] of the elements:\n${types
              .map((a) => `- <${a}>`)
              .join("\n")}`
          );
        }
      }

      if (!single) {
        throw new InvalidSyntaxError(
          `<${parentType}> expected one of the elements:\n${types
            .map((a) => `- <${a}>`)
            .join("\n")}\nbut none were found`
        );
      }

      return single;
    },

    spliceAssertSingle: (
      type: ElementType | ElementType[],
      maxAllowed: number = Infinity
    ): AstNode => {
      let count = 0;
      let single: AstNode | undefined;
      const search_types = asArray(type);

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (!child || !("type" in child)) {
          continue;
        }

        if (!search_types.includes(child.type)) {
          continue;
        }

        if (!single) {
          single = children.splice(i, 1)[0];
          i--;

          if (maxAllowed === Infinity) {
            break;
          }
        }

        count++;

        if (count > maxAllowed) {
          throw new InvalidSyntaxError(
            `<${parentType}> is not allowed more than [${maxAllowed}] elements of type:\n${search_types
              .map((a) => `- <${a}>`)
              .join("\n")}`
          );
        }
      }

      if (!single) {
        throw new InvalidSyntaxError(
          `<${parentType}> requires at least one element of type:\n${search_types
            .map((a) => `- <${a}>`)
            .join("\n")}\n but only none were found`
        );
      }

      return single;
    },

    spliceAssertExactPath: (
      path: (ElementType | "text" | (ElementType | "text" | null)[])[],
      options?: { noTrailing?: boolean }
    ): (AstNode | null)[] => {
      const collected: (AstNode | null)[] = [];
      const { noTrailing = false } = options ?? {};

      for (let i = 0; i < path.length; i++) {
        const search_type = path[i];

        if (!Array.isArray(search_type)) {
          if (search_type === "text") {
            collected.push(walker.spliceAssertNext([], { allowText: true }));
          } else {
            collected.push(walker.spliceAssertNext([search_type]));
          }
        } else {
          const types = new Set(search_type);
          const allow_text = types.has("text");
          types.delete("text");

          const optional = types.has(null);
          types.delete(null);

          if (optional) {
            const node = walker.spliceAssertNextOptional(
              Array.from(types as Set<ElementType>),
              { allowText: allow_text }
            );

            collected.push(node ?? null);
          } else {
            collected.push(
              walker.spliceAssertNext(Array.from(types as Set<ElementType>), {
                allowText: allow_text,
              })
            );
          }
        }
      }

      if (noTrailing && walker.remainingChildren.length > 0) {
        throw new InvalidSyntaxError(
          `<${parentType}> expected no children after path [${path
            .map((a) => (Array.isArray(a) ? `[${a.join(",")}]` : a))
            .join(",")}] but found:\n${walker.remainingChildTypes
            .map((a) => `- <${a}>`)
            .join("\n")}`
        );
      }

      return collected;
    },

    spliceAssertNext: (
      type: ElementType | ElementType[],
      options?: { allowText: boolean }
    ): AstNode => {
      const { allowText = false } = options ?? {};
      const search_types = Array.isArray(type) ? type : [type];
      const next = children[0];

      if (!next) {
        throw new InvalidSyntaxError(
          `<${parentType}> expected the next node to be one of:\n${search_types
            .map((a) => `- <${a}>`)
            .join("\n")}\nbut found no node`
        );
      }

      if (typeof next === "string") {
        if (allowText) {
          const text = children.splice(0, 1)[0] as string;
          return createTextNode({ value: text });
        }

        throw new InvalidSyntaxError(
          `<${parentType}> expected the next node to be one of:\n${search_types
            .map((a) => `- <${a}>`)
            .join("\n")}\nbut found text: ${next}`
        );
      }

      if (!search_types.includes(next.type)) {
        throw new InvalidSyntaxError(
          `<${parentType}> expected the next node to be one of:\n${search_types
            .map((a) => `- <${a}>`)
            .join("\n")}\nbut found <${next.type}> instead`
        );
      }

      return children.splice(0, 1)[0];
    },

    spliceAssertNextOptional: (
      type: ElementType | ElementType[],
      options?: { allowText: boolean }
    ): AstNode | null => {
      const { allowText = false } = options ?? {};
      const search_types = Array.isArray(type) ? type : [type];
      const next = children[0];

      if (!next) {
        return null;
      }

      if (typeof next === "string") {
        if (allowText) {
          const text = children.splice(0, 1)[0] as string;
          return createTextNode({ value: text });
        }

        return null;
      }

      if (!search_types.includes(next.type)) {
        return null;
      }

      return children.splice(0, 1)[0];
    },

    spliceAssertSingleOptional: (
      type: ElementType | ElementType[],
      maxAllowed: number = Infinity
    ): AstNode | undefined => {
      let count = 0;
      let single: AstNode | undefined;
      let search_types = Array.isArray(type) ? type : [type];

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child || !("type" in child)) {
          continue;
        }

        if (!search_types.includes(child.type)) {
          continue;
        }

        if (!single) {
          single = children.splice(i, 1)[0];
          i--;

          if (maxAllowed === Infinity) {
            break;
          }
        }

        count++;

        if (count > maxAllowed) {
          throw new InvalidSyntaxError(
            `<${parentType}> is not allowed more than [${maxAllowed}] <${type}> elements`
          );
        }
      }

      return single;
    },
  };

  return walker;
}
