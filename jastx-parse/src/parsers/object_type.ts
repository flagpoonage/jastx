import type { AstNode } from "jastx";
import { createTypeLiteral } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseObjectType(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createTypeLiteral({
      children,
    });
}
