import type { AstNode } from "jastx";
import { createBinaryExpression } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseAssignmentExpression(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createBinaryExpression({
      operator: "=",
      children,
    });
}
