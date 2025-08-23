import type { AstNode } from "jastx";
import { createCallExpression } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseCallExpression(n: SyntaxNode) {
  const optional_chain = !!n.children.find(
    (a) => !a.isNamed && a.type === "?."
  );
  return (children: AstNode[]) =>
    createCallExpression({ optionalChain: optional_chain, children });
}
