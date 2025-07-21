import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, VALUE_TYPES } from "../types.js";

const not_type = "expr:not";
export interface NotExpressionProps {
  children: any;
  double?: boolean;
}

export interface NotExpressionNode extends AstNode {
  type: typeof not_type;
  props: NotExpressionProps;
}

export function createNotExpression(
  props: NotExpressionProps
): NotExpressionNode {
  assertNChildren(not_type, 1, props);
  const double = props.double || false;

  const walker = createChildWalker(not_type, props);
  const expression = walker.spliceAssertNext([...VALUE_TYPES]);
  const requires_parens = ["arrow-function"].includes(expression.type);

  return {
    type: not_type,
    props,
    render: () =>
      `${double ? "!!" : "!"}${
        requires_parens ? `(${expression.render()})` : expression.render()
      }`,
  };
}

const await_type = "expr:await";
export interface AwaitExpressionProps {
  children: any;
}

export interface AwaitExpressionNode extends AstNode {
  type: typeof await_type;
  props: AwaitExpressionProps;
}

export function createAwaitExpression(
  props: AwaitExpressionProps
): AwaitExpressionNode {
  assertNChildren(await_type, 1, props);

  const walker = createChildWalker(await_type, props);
  const expression = walker.spliceAssertNext([...VALUE_TYPES]);
  const requires_parens = ["arrow-function"].includes(expression.type);

  return {
    type: await_type,
    props,
    render: () =>
      `await ${
        requires_parens ? `(${expression.render()})` : expression.render()
      }`,
  };
}
