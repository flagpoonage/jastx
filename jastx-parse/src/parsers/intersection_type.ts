import type { AstNode } from "jastx";
import { createTypeIntersection } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseIntersectionType(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createTypeIntersection({
      children,
    });
}
