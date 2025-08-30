import type { AstNode } from "jastx";
import { createPropertyAccessExpression } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseMemberExpression(n: SyntaxNode) {
  const optional_chain = !!n.childForFieldName("optional_chain");

  return (children: AstNode[]) =>
    createPropertyAccessExpression({
      optionalChain: optional_chain,
      children,
    });
}
