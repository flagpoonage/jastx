import { createTextNode } from "./builders/text-node.js";
import { InvalidSyntaxError } from "./errors.js";
import { AstNode, ElementType } from "./types.js";

interface AssertGroupOptions {
  allowText?: boolean;
  size?: [number | undefined, number | undefined];
}

export function createChildWalker(
  parentType: ElementType,
  props: { children?: any }
) {
  const children = Array.isArray(props?.children) ? props.children : [];

  return {
    get remainingChildren() {
      return children;
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
            `<${parentType}> text nodes are not allowed in this type`
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
      type: ElementType,
      maxAllowed: number = Infinity
    ): AstNode => {
      let count = 0;
      let single: AstNode | undefined;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child || !("type" in child)) {
          continue;
        }

        if (child.type !== type) {
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

      if (!single) {
        throw new InvalidSyntaxError(
          `<${parentType}> requires at a <${type}> element, but none were found`
        );
      }

      return single;
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
}
