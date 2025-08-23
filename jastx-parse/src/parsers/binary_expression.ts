import type { AstNode } from "jastx";
import type { BinaryExpressionProps } from "jastx/build";
import { createBinaryExpression } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { listUnnamedNodes } from "../util";

export function parseBinaryExpression(n: SyntaxNode) {
  listUnnamedNodes(n);

  const operator = n.children.find((a) => !a.isNamed);

  if (!operator) {
    throw new Error("Expected unnnamed [operator] in binary_expression");
  }

  return (children: AstNode[]) =>
    createBinaryExpression({
      children,
      operator: operator.text as BinaryExpressionProps["operator"],
    });
}
