import { AstNode } from "src/types.js";

export interface IdentifierProps {
  name: string;
}

export interface IdentifierNode extends AstNode {
  type: "identifier";
  props: IdentifierProps;
}

export function createIdentifier(props: IdentifierProps): IdentifierNode {
  return {
    type: "identifier",
    props,
    render: () => props.name,
  };
}
