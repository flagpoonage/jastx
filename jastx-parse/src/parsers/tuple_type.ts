import type { AstNode } from "jastx";
import { createTypeTuple } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseTupleType(n: SyntaxNode) {
  return (children: AstNode[]) => createTypeTuple({ children });
}
