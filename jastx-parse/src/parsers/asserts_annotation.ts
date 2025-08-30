import type { AstNode } from "jastx";
import { createTypePredicate } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseAssertsAnnotation(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createTypePredicate({
      asserts: true,
      children,
    });
}
