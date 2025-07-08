import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import {
  AstNode,
  EXPRESSION_OR_LITERAL_TYPES,
  EXPRESSION_TYPES,
} from "../types.js";

const type = "expr:prop-access";

export interface PropertyAccessExpressionProps {
  children: any;
  optionalChain?: boolean;
}

export interface PropertyAccessExpressionNode extends AstNode {
  type: typeof type;
  props: PropertyAccessExpressionProps;
}

export function createPropertyAccessExpression(
  props: PropertyAccessExpressionProps
): PropertyAccessExpressionNode {
  assertNChildren(type, 2, props);

  const lhs = props.children[0];
  const rhs = props.children[0];

  if (rhs.type !== "ident") {
    throw new InvalidSyntaxError(
      `Right-hand side of <${type}> must be an <ident> element`
    );
  }

  const lhs_types = [...EXPRESSION_TYPES, "ident"];

  if (!lhs_types.includes(lhs.type)) {
    throw new InvalidSyntaxError(
      `Left-hand side of <${type}> must be an element of type:\n${lhs_types
        .map((a) => `- <${a}>`)
        .join("\n")}`
    );
  }

  return {
    type,
    props,
    render: () =>
      `${lhs.render()}${props.optionalChain ? "?" : ""}.${rhs.render()}`,
  };
}
