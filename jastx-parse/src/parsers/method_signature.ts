import type { AstNode } from "jastx";
import { createMethodSignature } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseMethodSignature(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createMethodSignature({
      children: children,
    });
}
