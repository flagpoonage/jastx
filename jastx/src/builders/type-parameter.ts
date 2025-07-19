import { assertMaxChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, LITERAL_PRIMITIVE_TYPES, TYPE_TYPES } from "../types.js";

const type = "t:param";

export interface TypeParameterProps {
  children: any;
  /**
   * The binary operation specifies in the case of two children, whether
   * the second child should be an extend node, or a default node since
   * there's no way to differentiate between them otherwise.
   * If three children are provided, this value is not used, because both
   * an extends and a default will be provided
   * @example
   * T extends string
   * ^         ^
   * 1         2
   *
   * T = string
   * ^   ^
   * 1   2
   *
   * T extends string = string
   * ^         ^        ^
   * 1         2        3
   */
  binaryOperation?: "extends" | "default";
}

export interface TypeParameterNode extends AstNode {
  type: typeof type;
  props: TypeParameterProps;
}

export function createTypeParameter(
  props: TypeParameterProps
): TypeParameterNode {
  assertMaxChildren(type, 3, props);

  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext("ident");

  const [extends_type, defaults_type] = walker.spliceAssertGroup(
    [...TYPE_TYPES, ...LITERAL_PRIMITIVE_TYPES],
    { size: [0, 2] }
  );

  if (!extends_type) {
    return {
      type,
      props,
      render: ident.render,
    };
  }

  if (!defaults_type) {
    const binaryOperation = props.binaryOperation ?? "extends";
    return {
      type,
      props,
      render: () =>
        `${ident.render()}${
          binaryOperation === "default" ? "=" : " extends "
        }${extends_type.render()}`,
    };
  }

  return {
    type,
    props,
    render: () =>
      `${ident.render()} extends ${extends_type.render()}=${defaults_type.render()}`,
  };
}
