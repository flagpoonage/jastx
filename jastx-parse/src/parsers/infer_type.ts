import {
  createIdentifier,
  createTypeInfer,
  createTypeParameter,
} from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseInferType(n: SyntaxNode) {
  const child = n.namedChildren[0];

  if (!child) {
    throw new Error("Expected named child in infer_type");
  }

  if (child.type !== "type_identifier") {
    throw new Error("Expected infer_type child to be type_identifier");
  }

  return createTypeInfer({
    children: [
      createTypeParameter({
        children: [createIdentifier({ name: child.text })],
      }),
    ],
  });
}
