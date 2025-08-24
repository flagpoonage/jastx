import type { AstNode } from "jastx";
import { createFunctionDeclaration } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { hasUnnamedNode, isParentOfType } from "../util";

export function parseFunctionDeclaration(n: SyntaxNode) {
  const exported = isParentOfType(n, "export_statement");
  const is_async = hasUnnamedNode(n, "async");

  return (children: AstNode[]) =>
    createFunctionDeclaration({
      exported,
      async: is_async,
      children,
    });
}
