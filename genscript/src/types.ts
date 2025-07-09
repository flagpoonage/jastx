const _type_primitives = [
  "string",
  "number",
  "boolean",
  "any",
  "unknown",
] as const;

export type TypePrimitiveName = (typeof _type_primitives)[number];

const _properties = ["var-name", "fun-name", "type"] as const;
export type PassthroughElementTypeName = (typeof _properties)[number];
export type PassthroughElementType = `p:${PassthroughElementTypeName}`;

const _literals = ["boolean", "number", "string", "regex"] as const;

export type LiteralElementTypeName = (typeof _literals)[number];
export type LiteralElementType = `l:${LiteralElementTypeName}`;

export type ElementType =
  | "ident"
  | "var:statement"
  | "var:declaration"
  | "var:declaration-list"
  | "var:declaration-name"
  | "exact-literal"
  | "expr:as"
  | "expr:binary"
  | "expr:non-null"
  | "expr:parens"
  | "expr:prop-access"
  | "expr:elem-access"
  | "t:primitive"
  | LiteralElementType
  | PassthroughElementType;

export const EXPRESSION_TYPES: readonly ElementType[] = [
  "expr:as",
  "expr:parens",
  "expr:binary",
  "expr:non-null",
  "expr:prop-access",
  "expr:elem-access",
];

export const LITERAL_PRIMITIVE_TYPES: readonly LiteralElementType[] = [
  "l:number",
  "l:boolean",
  "l:string",
];

export const LITERAL_TYPES: readonly LiteralElementType[] = [
  ...LITERAL_PRIMITIVE_TYPES,
  "l:regex",
];

export const PASSTHROUGH_TYPES: readonly PassthroughElementType[] = [
  "p:fun-name",
  "p:var-name",
  "p:type",
];

export const EXPRESSION_OR_LITERAL_TYPES: readonly ElementType[] = [
  ...EXPRESSION_TYPES,
  ...LITERAL_TYPES,
];

export type ExpressionType = Extract<ElementType, "parens-expression">;

export type AstNode = {
  type: ElementType;
  docs?: AstNode;
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
