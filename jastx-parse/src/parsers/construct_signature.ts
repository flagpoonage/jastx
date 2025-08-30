import type { AstNode } from "jastx";
import { createConstructSignature } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseConstructSignature(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createConstructSignature({
      children,
    });
}
