import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, VALUE_TYPES } from "../types.js";

const type = "expr:not";

export interface NotExpressionProps {
  children: any;
}

export interface NotExpressionNode extends AstNode {
  type: typeof type;
  props: NotExpressionProps;
}

export function createNotExpression(
  props: NotExpressionProps
): NotExpressionNode {
  assertNChildren(type, 1, props);

  const walker = createChildWalker(type, props);
  const expression = walker.spliceAssertNext([...VALUE_TYPES]);
  const requires_parens = ["arrow-function"].includes(expression.type);

  return {
    type,
    props,
    render: () =>
      `!${requires_parens ? `(${expression.render()})` : expression.render()}`,
  };
}
