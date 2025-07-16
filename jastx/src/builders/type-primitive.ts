import { assertZeroChildren } from "../asserts.js";
import { AstNode, TypePrimitiveName } from "../types.js";

const type = "t:primitive";

export interface TypePrimitiveProps {
  type: TypePrimitiveName;
}

export interface TypePrimitiveNode extends AstNode {
  type: typeof type;
  props: TypePrimitiveProps;
}

export function createTypePrimitive(
  props: TypePrimitiveProps
): TypePrimitiveNode {
  assertZeroChildren(type, props);

  return {
    type,
    props,
    render: () => props.type,
  };
}
