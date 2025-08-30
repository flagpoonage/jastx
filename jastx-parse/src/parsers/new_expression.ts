import type { AstNode } from "jastx";
import { createCallExpression, createNewExpression } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseNewExpression(n: SyntaxNode) {
  // (new_expression constructor: (identifier) arguments: (arguments (string (string_fragment))))

  const constructor = n.childForFieldName("constructor");
  const c_args = n.childForFieldName("arguments");

  if (!constructor) {
    throw new Error("Expected constructor in new_expression");
  }

  if (c_args) {
    return (children: AstNode[]) =>
      createNewExpression({
        children: [
          createCallExpression({
            children,
          }),
        ],
      });
  } else {
    return (children: AstNode[]) =>
      createNewExpression({
        children,
      });
  }
}
