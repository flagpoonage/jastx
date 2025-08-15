const _type_primitives = [
  "string",
  "number",
  "boolean",
  "symbol",
  "void",
  "any",
  "unknown",
  "never",
] as const;

export type TypePrimitiveName = (typeof _type_primitives)[number];

const _literals = [
  "boolean",
  "number",
  "string",
  "regex",
  "bigint",
  "object",
  "array",
] as const;

export type LiteralElementTypeName = (typeof _literals)[number];
export type LiteralElementType = `l:${LiteralElementTypeName}`;

const _literal_object_nodes = ["prop", "getter", "setter"] as const;

export type LiteralObjectNodeTypeName = (typeof _literal_object_nodes)[number];
export type LiteralObjectNodeType = `l:object-${LiteralObjectNodeTypeName}`;

const _standalone_exressions = [
  "template",
  "function",
  "parens",
  "prop-access",
  "elem-access",
  "cond",
] as const;

const _binary_expressions = ["as", "binary"] as const;

const _unary_expressions = [
  "not",
  "await",
  "typeof",
  "call",
  "non-null",
  "yield_", // Reserved word
] as const;

export type UnaryExpressionTypeName = (typeof _unary_expressions)[number];
export type UnaryExpressionType = `expr:${UnaryExpressionTypeName}`;

export type BinaryExpressionTypeName = (typeof _binary_expressions)[number];
export type BinaryExpressionType = `expr:${BinaryExpressionTypeName}`;

export type StandaloneExpressionTypeName =
  (typeof _standalone_exressions)[number];
export type StandaloneExpressionType = `expr:${StandaloneExpressionTypeName}`;

export type ExpressionTypeName =
  | UnaryExpressionTypeName
  | BinaryExpressionTypeName
  | StandaloneExpressionTypeName;

export type ExpressionType =
  | UnaryExpressionType
  | BinaryExpressionType
  | StandaloneExpressionType;

const _types = [
  "primitive",
  "ref",
  "cond",
  "indexed",
  "param",
  "predicate",
  "literal",
  "tuple",
  "query",
  "function",
  "interface_", // Reserved word

  // Signatures
  "method",
  "construct",
  "property",
  "index",
] as const;

export type TypeElementTypeName = (typeof _types)[number];
export type TypeElementType = `t:${TypeElementTypeName}`;

const _statements = [
  "expr",
  "var",
  "if",
  "return",
  "try",
  "for-of",
  "for-in",
  "for",
  "while",
  "do-while",
] as const;

export type StatementElementTypeName = (typeof _statements)[number];
export type StatementElementType = `stmt:${StatementElementTypeName}`;

const _declarations = ["function", "var", "var-list", "export"] as const;

export type DeclarationElementTypeName = (typeof _declarations)[number];
export type DeclarationElementType = `dclr:${DeclarationElementTypeName}`;

export type ElementType =
  | "ident"
  | "text"
  | "block"
  | "arrow-function"
  | "param"
  | "catch-clause"
  | "export-specifier"
  | "named-exports"
  | "namespace-export"
  | "export-default"
  | "heritage-clause"
  | "heritage-ident"
  | "bind:array"
  | "bind:array-elem"
  | "bind:object"
  | "bind:object-elem"
  | LiteralObjectNodeType
  | ExpressionType
  | TypeElementType
  | LiteralElementType
  | StatementElementType
  | DeclarationElementType;

export const STANDLONE_EXPRESSION_TYPES: readonly StandaloneExpressionType[] = [
  "expr:elem-access",
  "expr:function",
  "expr:parens",
  "expr:prop-access",
  "expr:template",
  "expr:cond",
];

export function isStandaloneExpressionType(
  v: string
): v is StandaloneExpressionType {
  return STANDLONE_EXPRESSION_TYPES.includes(v as StandaloneExpressionType);
}

export const BINARY_EXPRESSION_TYPES: readonly BinaryExpressionType[] = [
  "expr:as",
  "expr:binary",
];

export function isBinaryExpressionType(v: string): v is BinaryExpressionType {
  return BINARY_EXPRESSION_TYPES.includes(v as BinaryExpressionType);
}

export const UNARY_EXPRESSION_TYPES: readonly UnaryExpressionType[] = [
  "expr:not",
  "expr:await",
  "expr:call",
  "expr:typeof",
  "expr:non-null",
  "expr:yield_",
];

export function isUnaryExpressionType(v: string): v is UnaryExpressionType {
  return UNARY_EXPRESSION_TYPES.includes(v as UnaryExpressionType);
}

export const LITERAL_PRIMITIVE_TYPES: readonly LiteralElementType[] = [
  "l:number",
  "l:boolean",
  "l:string",
  "l:bigint",
];

export const LITERAL_TYPES: readonly LiteralElementType[] = [
  ...LITERAL_PRIMITIVE_TYPES,
  "l:regex",
  "l:object",
  "l:array",
];

export const TYPE_TYPES: readonly TypeElementType[] = [
  "t:primitive",
  "t:ref",
  "t:cond",
  "t:indexed",
  "t:literal",
  "t:tuple",
  "t:query",
  "t:function",
  "t:predicate",
  // t:param is only used in functions so it shouldnt be included here generally.
  // t:predicate is only used as a function return type, so is not included here generally.
] as const;

export const STATEMENT_TYPES: readonly StatementElementType[] = [
  "stmt:expr",
  "stmt:if",
  "stmt:var",
  "stmt:return",
  "stmt:try",
  "stmt:for-of",
  "stmt:for-in",
  "stmt:for",
  "stmt:while",
  "stmt:do-while",
] as const;

export const DECLARATION_TYPES: readonly DeclarationElementType[] = [
  "dclr:function",
  "dclr:var",
  // var-list is pretty much only allowed inside dclr:var
  // "dclr:var-list"
  // export declarataions are only allowed in the top level
  // "dclr:export",
];

export const TOP_LEVEL_DECLARATION_TYPES: readonly DeclarationElementType[] = [
  ...DECLARATION_TYPES,
  "dclr:export",
];

export function omitFrom(
  t: ElementType[] | readonly ElementType[],
  types: ElementType | ElementType[]
) {
  const omit_types = Array.isArray(types) ? types : [types];
  return t.filter((v) => !omit_types.includes(v));
}

export function isTypeType(v: string) {
  return TYPE_TYPES.includes(v as TypeElementType);
}

export const EXPRESSION_TYPES = [
  ...BINARY_EXPRESSION_TYPES,
  ...UNARY_EXPRESSION_TYPES,
  ...STANDLONE_EXPRESSION_TYPES,
];

export const EXPRESSION_OR_LITERAL_TYPES: readonly ElementType[] = [
  ...EXPRESSION_TYPES,
  ...LITERAL_TYPES,
];

export const VALUE_TYPES = [
  ...EXPRESSION_OR_LITERAL_TYPES,
  "ident",
  "arrow-function",
] as const;

export const ANY_TYPE = [...EXPRESSION_OR_LITERAL_TYPES, ...TYPE_TYPES];

export type AstNode = {
  type: ElementType;
  docs?: AstNode;
  props: any; // TODO: Make this more accurate
  render: () => string;
};

export type Stringable = string | { toString: (...args: any) => string };

export interface JSXCreationInterface {
  [K: string]: any;
  children?: AstNode;
}

export interface JSXSCreationInterface {
  [K: string]: any;
  children?: AstNode[];
}

export type WithChildren<T> = T & {
  children?: AstNode[] | any;
};
