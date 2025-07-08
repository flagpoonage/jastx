import { assertZeroChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import {
  AstNode,
  EXPRESSION_OR_LITERAL_TYPES,
  LITERAL_TYPES,
} from "../types.js";
import { stringRenderer } from "../utils.js";

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
  const walker = createChildWalker(type, props);

  const expr_node = walker.spliceAssertOneof(
    [...LITERAL_TYPES, "expr:parens", "ident"],
    1
  );

  return {
    type,
    props,
    render: () => {
      return `${expr_node.render()}!`;
    },
  };
}
