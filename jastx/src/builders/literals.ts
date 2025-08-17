import { assertZeroChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, VALUE_TYPES } from "../types.js";

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

const regex_type = "l:regex";
export interface RegexLiteralProps {
  value: string;
  hasIndices?: boolean;
  ignoreCase?: boolean;
  global?: boolean;
  multiline?: boolean;
  dotAll?: boolean;
  unicode?: boolean;
  unicodeSets?: boolean;
  sticky?: boolean;
}

// d	Generate indices for substring matches.	hasIndices
// g	Global search.	global
// i	Case-insensitive search.	ignoreCase
// m	Makes ^ and $ match the start and end of each line instead of those of the entire string.	multiline
// s	Allows . to match newline characters.	dotAll
// u	"Unicode"; treat a pattern as a sequence of Unicode code points.	unicode
// v	An upgrade to the u mode with more Unicode features.	unicodeSets
// y	Perform a "sticky" search that matches starting at the current position in the target string.	sticky

export interface RegexLiteralNode extends AstNode {
  type: typeof regex_type;
  props: RegexLiteralProps;
}

export function createRegexLiteral(props: RegexLiteralProps): RegexLiteralNode {
  assertZeroChildren(regex_type, props);

  return {
    type: regex_type,
    props,
    render: () =>
      `/${props.value}/${props.hasIndices ? "d" : ""}${
        props.global ? "g" : ""
      }${props.ignoreCase ? "i" : ""}${props.multiline ? "m" : ""}${
        props.dotAll ? "s" : ""
      }${props.unicode ? "u" : ""}${props.unicodeSets ? "v" : ""}${
        props.sticky ? "y" : ""
      }`,
  };
}

const bigint_type = "l:bigint";

export interface BigintLiteralProps {
  value: number;
}

export interface BigintLiteralNode extends AstNode {
  type: typeof bigint_type;
  props: BigintLiteralProps;
}

export function createBigintLiteral(
  props: BigintLiteralProps
): BigintLiteralNode {
  assertZeroChildren(bigint_type, props);

  if (!Number.isInteger(props.value) || props.value.toString().includes("e")) {
    throw new InvalidSyntaxError(
      `<${bigint_type}> value must be a non-exponential integer value`
    );
  }

  return {
    type: bigint_type,
    props,
    render: () => `${props.value}n`,
  };
}

const array_type = "l:array";

export interface ArrayLiteralProps {
  children?: AstNode[];
}

export interface ArrayLiteralNode extends AstNode {
  type: typeof array_type;
  props: ArrayLiteralProps;
}

export function createArrayLiteral(props: ArrayLiteralProps): ArrayLiteralNode {
  const walker = createChildWalker(array_type, props);

  const element_nodes = walker.spliceAssertGroup([
    ...VALUE_TYPES,
    "spread-element",
  ]);

  return {
    type: array_type,
    props,
    render: () => `[${element_nodes.map((v) => v.render()).join(",")}]`,
  };
}
