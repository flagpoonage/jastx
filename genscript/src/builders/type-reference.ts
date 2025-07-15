import { assertZeroChildren } from "../asserts.js";
import { AstNode } from "../types.js";

const type = "t:ref";

export interface TypeReferenceProps {
  name: string;
}

export interface TypeReferenceNode extends AstNode {
  type: typeof type;
  props: TypeReferenceProps;
}

export function createTypeReference(
  props: TypeReferenceProps
): TypeReferenceNode {
  assertZeroChildren(type, props);

  return {
    type,
    props,
    render: () => props.name,
  };
}
