import { assertZeroChildren } from "../asserts.js";
import { AstNode } from "../types.js";

const type = "ident";

export interface IdentifierProps {
  name: string;
}

export interface IdentifierNode extends AstNode {
  type: typeof type;
  props: IdentifierProps;
}

export function createIdentifier(props: IdentifierProps): IdentifierNode {
  assertZeroChildren(type, props);

  return {
    type,
    props,
    render: () => props.name,
  };
}
