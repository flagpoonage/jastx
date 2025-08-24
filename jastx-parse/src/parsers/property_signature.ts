import type { AstNode } from "jastx";
import { createPropertySignature } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { hasUnnamedNode } from "../util";

export function parsePropertySignature(n: SyntaxNode) {
  const optional = hasUnnamedNode(n, "?");
  const computed =
    n.childForFieldName("name")?.type === "computed_property_name";

  return (children: AstNode[]) =>
    createPropertySignature({
      optional,
      children,
      computed,
    });
}
