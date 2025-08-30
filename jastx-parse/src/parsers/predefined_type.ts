import type { TypePrimitiveProps } from "jastx/build";
import { createTypePrimitive } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parsePredefinedType(n: SyntaxNode) {
  return () =>
    createTypePrimitive({
      type: n.children[0].type as TypePrimitiveProps["type"],
    });
}
