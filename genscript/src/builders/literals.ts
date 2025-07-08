import { assertZeroChildren } from "../asserts.js";
import { AstNode } from "../types.js";

const boolean_type = "l:boolean";

export interface BooleanLiteralProps {
  value: boolean;
}

export interface BooleanLiteralNode extends AstNode {
  type: typeof boolean_type;
  props: BooleanLiteralProps;
}

export function createBooleanLiteral(
  props: BooleanLiteralProps
): BooleanLiteralNode {
  assertZeroChildren(boolean_type, props);

  return {
    type: boolean_type,
    props,
    render: () => `${props.value}`,
  };
}

const number_type = "l:number";

export interface NumberLiteralProps {
  value: number;
}

export interface NumberLiteralNode extends AstNode {
  type: typeof number_type;
  props: NumberLiteralProps;
}

export function createNumberLiteral(
  props: NumberLiteralProps
): NumberLiteralNode {
  assertZeroChildren(number_type, props);

  return {
    type: number_type,
    props,
    render: () => `${props.value}`,
  };
}

const string_type = "l:string";

export interface StringLiteralProps {
  value: string;
}

export interface StringLiteralNode extends AstNode {
  type: typeof string_type;
  props: StringLiteralProps;
}

export function createStringLiteral(
  props: StringLiteralProps
): StringLiteralNode {
  assertZeroChildren(string_type, props);

  return {
    type: string_type,
    props,
    render: () => `${JSON.stringify(props.value)}`,
  };
}
