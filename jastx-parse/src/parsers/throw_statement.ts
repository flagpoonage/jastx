import type { AstNode } from "jastx";
import { createThrowStatement } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseThrowStatement(n: SyntaxNode) {
  return (children: AstNode[]) => createThrowStatement({ children });
}
