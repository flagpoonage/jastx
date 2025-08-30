import type { AstNode } from "jastx";
import { createIndexSignature } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseIndexSignature(v: SyntaxNode) {
  return (children: AstNode[]) =>
    createIndexSignature({
      children,
    });
}
