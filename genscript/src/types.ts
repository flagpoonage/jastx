const _properties = ["var-name", "fun-name", "initializer", "type"] as const;
export type PassthroughElementType = (typeof _properties)[number];

export type ElementType =
  | "variable-statement"
  | "variable-declaration"
  | "variable-declaration-list"
  | "identifier"
  | "variable-declaration-name"
  | "exact-literal"
  | `p:${PassthroughElementType}`;

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
