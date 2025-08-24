import type { AstNode } from "jastx";
import { createFunctionExpression } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { hasUnnamedNode } from "../util";

export function parseFunctionExpression(n: SyntaxNode) {
  const async = hasUnnamedNode(n, "async");
  return (children: AstNode[]) =>
    createFunctionExpression({
      children,
      async,
    });
}
