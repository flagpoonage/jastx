import { assertNChildren } from "../asserts.js";
import { LhsInvalidTypeError } from "../errors.js";
import {
  AstNode,
  EXPRESSION_OR_LITERAL_TYPES,
  isBinaryExpressionType,
  isUnaryExpressionType,
} from "../types.js";

const type = "expr:elem-access";

export interface ElementAccessExpressionProps {
  children: any;
  optionalChain?: boolean;
}

export interface ElementAccessExpressionNode extends AstNode {
  type: typeof type;
  props: ElementAccessExpressionProps;
}

const lhs_types = [...EXPRESSION_OR_LITERAL_TYPES, "ident"];
const rhs_types = [...EXPRESSION_OR_LITERAL_TYPES, "ident"];

export function createElementAccessExpression(
  props: ElementAccessExpressionProps
): ElementAccessExpressionNode {
  assertNChildren(type, 2, props);

  const [lhs, rhs] = props.children;

  if (!lhs_types.includes(lhs.type)) {
    throw new LhsInvalidTypeError(type, lhs_types, lhs.type);
  }

  if (!rhs_types.includes(rhs.type)) {
    throw new LhsInvalidTypeError(type, rhs_types, rhs.type);
  }

  const requires_parens =
    isUnaryExpressionType(lhs.type) || isBinaryExpressionType(lhs.type);

  return {
    type,
    props,
    render: () =>
      `${requires_parens ? `(${lhs.render()})` : lhs.render()}${
        props.optionalChain ? "?." : ""
      }[${rhs.render()}]`,
  };
}
