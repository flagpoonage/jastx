import { assertNChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const type = "expr:binary";

const _arithmetic_operators = ["+", "-", "/", "*", "**", "%"] as const;

const _relational_operators = [
  "<",
  "<=",
  "==",
  ">=",
  ">",
  "instanceof",
  "in",
] as const;

const _equality_operators = ["==", "!=", "===", "!=="] as const;

const _bitwise_shift_operators = ["<<", ">>", ">>>"] as const;

const _binary_bitwise_operators = ["&", "|", "^"] as const;

const _binary_logical_operators = ["&&", "||", "??"] as const;

const _assignment_operators = [
  "=",
  "*=",
  "/=",
  "%=",
  "+=",
  "-=",
  "<<=",
  ">>=",
  ">>>=",
  "&=",
  "^=",
  "!=",
  "**=",
  "&&=",
  "||=",
  "??=",
] as const;

type ArithmeticOperator = (typeof _arithmetic_operators)[number];
type RelationalOperator = (typeof _relational_operators)[number];
type EqualityOperator = (typeof _equality_operators)[number];
type BitwiseShiftOperator = (typeof _bitwise_shift_operators)[number];
type BinaryBitwiseOperator = (typeof _binary_bitwise_operators)[number];
type BinaryLogicalOperator = (typeof _binary_logical_operators)[number];
type AssignmentOperator = (typeof _assignment_operators)[number];

type BinaryOperator =
  | ArithmeticOperator
  | RelationalOperator
  | EqualityOperator
  | BitwiseShiftOperator
  | BinaryBitwiseOperator
  | BinaryLogicalOperator
  | AssignmentOperator
  | ",";

export interface BinaryExpressionProps {
  children: any;
  operator: BinaryOperator;
}

export interface BinaryExpressionNode extends AstNode {
  type: typeof type;
  props: BinaryExpressionProps;
}

export function createBinaryExpression(
  props: BinaryExpressionProps
): BinaryExpressionNode {
  assertNChildren(type, 2, props);
  const walker = createChildWalker(type, props);

  const [lhs, rhs] = walker.spliceAssertExactPath([
    _assignment_operators.includes(props.operator as AssignmentOperator)
      ? ["ident", "expr:elem-access", "expr:prop-access"]
      : ["ident", ...EXPRESSION_OR_LITERAL_TYPES],
    // TODO: There's way more to it than this. For example arithmetic expressions
    // cant have a string RHS. But best to implement it generic for now, and then
    // come back and really nail all the rules afterwards, otherwise it will give
    // the false sense of security that it's all correct
    ["ident", ...EXPRESSION_OR_LITERAL_TYPES],
  ]);

  assertValue(lhs);
  assertValue(rhs);

  return {
    type,
    props,
    render: () => `${lhs.render()} ${props.operator} ${rhs.render()}`,
  };
}
