import type { AstNode } from "jastx";
import { createTypeUnion } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseUnionType(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createTypeUnion({
      children,
    });
}
