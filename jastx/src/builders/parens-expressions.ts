import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES, VALUE_TYPES } from "../types.js";

const type = "expr:parens";

export interface ParensExpressionProps {
  children: any;
  type?: string;
}

export interface ParensExpressionNode extends AstNode {
  type: typeof type;
  props: ParensExpressionProps;
}

export function createParensExpression(
  props: ParensExpressionProps
): ParensExpressionNode {
  const walker = createChildWalker(type, props);

  assertNChildren(type, 1, props);

  const expr_node = walker.spliceAssertOneof(VALUE_TYPES, 1);

  return {
    type,
    props,
    render: () => `(${expr_node.render()})`,
  };
}
