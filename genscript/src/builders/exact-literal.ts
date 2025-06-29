import { assertZeroChildren } from "../asserts.js";
import { AstNode } from "../types.js";

const type = "exact-literal";

export interface ExactLiteralProps {
  value: string;
}

export interface ExactLiteralNode extends AstNode {
  type: "exact-literal";
  props: ExactLiteralProps;
}

export function createExactLiteral(props: ExactLiteralProps): ExactLiteralNode {
  assertZeroChildren(type, props);
  return {
    type,
    props,
    render: () => props.value,
  };
}
