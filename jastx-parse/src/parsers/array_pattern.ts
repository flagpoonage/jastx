import type { AstNode } from "jastx";
import { createArrayBinding } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseArrayPattern(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createArrayBinding({
      children,
    });
}
