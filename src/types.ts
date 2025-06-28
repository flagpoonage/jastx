export type ElementType =
  | "variable-statement"
  | "identifier"
  | "variable-declaration-name"
  | "exact-literal";

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
