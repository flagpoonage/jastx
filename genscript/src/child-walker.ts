import { AstNode, ElementType } from "./types.js";

export function createChildWalker(props: { children?: any }) {
  const children = Array.isArray(props?.children) ? props.children : [];

  return {
    get remainingChildren() {
      return children;
    },
    spliceAssertGroup: (
      type: ElementType,
      size?: [number | undefined, number | undefined]
    ): AstNode[] => {
      const [min, max] = !size
        ? [0, Infinity]
        : [
            typeof size[0] === "number" ? Math.max(0, size[0]) : 0,
            typeof size[1] === "number" ? Math.max(0, size[1]) : Infinity,
          ];
      const group = [];

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child || !("type" in child)) {
          continue;
        }

        if (child.type !== type) {
          continue;
        }

        group.push(children.splice(i, 1)[0]);
        i--;

        if (group.length > max) {
          throw new Error(
            `Reached max child count while extracting [${type}]. More than [${max}] elements found`
          );
        }
      }

      if (group.length < min) {
        throw new Error(
          `Minimum child count not met while extracting [${type}]. Only found [${group.length}] but needed [${min}]`
        );
      }

      return group;
    },

    spliceAssertOneof: (
      types: ElementType[],
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
          throw new Error(
            `Reached max child count while extracting [${types}]. More than [${maxAllowed}] elements found`
          );
        }
      }

      if (!single) {
        throw new Error(
          `No matching children found while extracting [${types}]`
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
          throw new Error(
            `Reached max child count while extracting [${type}]. More than [${maxAllowed}] elements found`
          );
        }
      }

      if (!single) {
        throw new Error(
          `No matching children found while extracting [${type}]`
        );
      }

      return single;
    },

    spliceAssertSingleOptional: (
      type: ElementType,
      maxAllowed: number = Infinity
    ): AstNode | undefined => {
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
          throw new Error(
            `Reached max child count while extracting [${type}]. More than [${maxAllowed}] elements found`
          );
        }
      }

      return single;
    },
  };
}
