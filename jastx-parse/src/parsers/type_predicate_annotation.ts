import type { AstNode } from "jastx";
import { createTypePredicate } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseTypePredicateAnnotation(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createTypePredicate({
      asserts: false,
      children,
    });
}
