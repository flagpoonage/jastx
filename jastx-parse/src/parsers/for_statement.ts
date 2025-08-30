import type { AstNode } from "jastx";
import { createForStatement } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseForStatement(n: SyntaxNode) {
  const condition = n.childForFieldName("condition");
  const increment = n.childForFieldName("increment");

  const no_condition = !condition && !!increment;

  return (children: AstNode[]) =>
    createForStatement({
      children,
      noCondition: no_condition,
    });
}
