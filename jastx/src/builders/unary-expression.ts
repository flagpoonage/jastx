import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, VALUE_TYPES } from "../types.js";

const requires_parens_types = ["arrow-function", "expr:yield_"];

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
  const requires_parens = requires_parens_types.includes(expression.type);

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
  const requires_parens = requires_parens_types.includes(expression.type);

  return {
    type: await_type,
    props,
    render: () =>
      `await ${
        requires_parens ? `(${expression.render()})` : expression.render()
      }`,
  };
}

const typeof_type = "expr:typeof";
export interface TypeofExpressionProps {
  children: any;
}

export interface TypeofExpressionNode extends AstNode {
  type: typeof typeof_type;
  props: TypeofExpressionProps;
}

export function createTypeofExpression(
  props: TypeofExpressionProps
): TypeofExpressionNode {
  assertNChildren(typeof_type, 1, props);

  const walker = createChildWalker(typeof_type, props);
  const expression = walker.spliceAssertNext([...VALUE_TYPES]);
  const requires_parens = requires_parens_types.includes(expression.type);

  return {
    type: typeof_type,
    props,
    render: () =>
      `typeof ${
        requires_parens ? `(${expression.render()})` : expression.render()
      }`,
  };
}

const yield_type = "expr:yield_";
export interface YieldExpressionProps {
  children: any;
}

export interface YieldExpressionNode extends AstNode {
  type: typeof yield_type;
  props: YieldExpressionProps;
}

export function createYieldExpression(
  props: YieldExpressionProps
): YieldExpressionNode {
  assertNChildren(yield_type, 1, props);

  const walker = createChildWalker(yield_type, props);
  const expression = walker.spliceAssertNext([...VALUE_TYPES]);
  const requires_parens = requires_parens_types.includes(expression.type);

  return {
    type: yield_type,
    props,
    render: () =>
      `yield ${
        requires_parens ? `(${expression.render()})` : expression.render()
      }`,
  };
}
