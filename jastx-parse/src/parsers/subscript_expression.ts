import type { AstNode } from "jastx";
import { createElementAccessExpression } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseSubscriptExpression(n: SyntaxNode) {
  const optional_chain = !!n.childForFieldName("optional_chain");

  return (children: AstNode[]) =>
    createElementAccessExpression({
      optionalChain: optional_chain,
      children,
    });
}
