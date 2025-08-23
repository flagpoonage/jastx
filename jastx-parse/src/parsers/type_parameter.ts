import type { AstNode } from "jastx";
import { createIdentifier, createTypeParameter } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseTypeParameter(n: SyntaxNode) {
  const constraint_node = n.childForFieldName("constraint");
  const value_node = n.childForFieldName("value");

  const binary_operation =
    constraint_node && value_node
      ? undefined
      : constraint_node
      ? "extends"
      : "default";

  return (children: AstNode[]) => {
    return createTypeParameter({
      binaryOperation: binary_operation,
      children: [
        createIdentifier({ name: children[0].render() }),
        ...children.slice(1),
      ],
    });
  };
}
