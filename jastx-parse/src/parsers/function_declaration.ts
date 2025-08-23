import type { AstNode } from "jastx";
import { createFunctionDeclaration } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseFunctionDeclaration(n: SyntaxNode) {
  const walker = n.walk();
  const maybe_export = walker.currentNode.parent;

  const exported = maybe_export?.type === "export_statement";
  return (children: AstNode[]) =>
    createFunctionDeclaration({
      exported,
      children,
    });
}
