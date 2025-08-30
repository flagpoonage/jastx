import type { AstNode } from "jastx";
import { createObjectLiteral } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseObject(n: SyntaxNode) {
  return (children: AstNode[]) =>
    createObjectLiteral({
      children,
    });
}
