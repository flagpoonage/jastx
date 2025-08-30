import type { AstNode } from "jastx";
import { createSpreadElement } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseSpreadElement(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createSpreadElement({
      children,
    });
}
