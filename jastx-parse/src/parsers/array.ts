import type { AstNode } from "jastx";
import { createArrayLiteral } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseArray(n: SyntaxNode) {
  return (children: AstNode[]) => createArrayLiteral({ children });
}
