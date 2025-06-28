import { AstNode } from "src/types.js";

export interface ExactLiteralProps {
  value: string;
}

export interface ExactLiteralNode extends AstNode {
  type: "exact-literal";
  props: ExactLiteralProps;
}

export function createExactLiteral(props: ExactLiteralProps): ExactLiteralNode {
  return {
    type: "exact-literal",
    props,
    render: () => props.value,
  };
}
