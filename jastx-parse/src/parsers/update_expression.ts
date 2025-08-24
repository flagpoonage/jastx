import type { AstNode } from "jastx";
import {
  createDecrementExpression,
  createIncrementExpression,
} from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseUpdateExpression(n: SyntaxNode) {
  const iterator_index = n.children.findIndex(
    (a) => !a.isNamed && ["++", "--"].includes(a.type)
  );

  if (iterator_index === -1) {
    throw new Error("Expected ++ or -- operator in update_expression");
  }

  const iterator = n.children[iterator_index];

  console.log("FOUND ITERATOR TYPE", iterator);

  if (iterator.type === "++") {
    return (children: AstNode[]) =>
      createIncrementExpression({ children, prefix: iterator_index === 0 });
  } else {
    return (children: AstNode[]) =>
      createDecrementExpression({ children, prefix: iterator_index === 0 });
  }
}
