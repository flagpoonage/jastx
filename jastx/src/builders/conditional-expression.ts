import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const type = "expr:cond";

export interface ConditionExpressionProps {
  children: any;
}

export interface ConditionExpressionNode extends AstNode {
  type: typeof type;
  props: ConditionExpressionProps;
}

export function createConditionExpression(
  props: ConditionExpressionProps
): ConditionExpressionNode {
  assertNChildren(type, 3, props);
  const walker = createChildWalker(type, props);

  const condition_elem = walker.spliceAssertNext([
    "ident",
    ...EXPRESSION_OR_LITERAL_TYPES,
  ]);

  const true_elem = walker.spliceAssertNext([
    "ident",
    ...EXPRESSION_OR_LITERAL_TYPES,
  ]);

  const false_elem = walker.spliceAssertNext([
    "ident",
    ...EXPRESSION_OR_LITERAL_TYPES,
  ]);

  return {
    type,
    props,
    render: () =>
      `${condition_elem.render()}?${true_elem.render()}:${false_elem.render()}`,
  };
}
