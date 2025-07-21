import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, VALUE_TYPES } from "../types.js";

const type = "expr:non-null";

export interface NonNullExpressionProps {
  children: any;
  type?: string;
}

export interface NonNullExpressionNode extends AstNode {
  type: typeof type;
  props: NonNullExpressionProps;
}

export function createNonNullExpression(
  props: NonNullExpressionProps
): NonNullExpressionNode {
  assertNChildren(type, 1, props);
  const walker = createChildWalker(type, props);

  const expr_node = walker.spliceAssertNext([...VALUE_TYPES]);
  const requires_parens = ["arrow-function"].includes(expr_node.type);

  return {
    type,
    props,
    render: () =>
      `${requires_parens ? `(${expr_node.render()})` : expr_node.render()}!`,
  };
}
