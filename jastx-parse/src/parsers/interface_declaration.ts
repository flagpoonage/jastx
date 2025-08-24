import type { AstNode } from "jastx";
import { createIdentifier, createTypeInterface } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { isParentOfType } from "../util";

export function parseInterfaceDeclaration(n: SyntaxNode) {
  const exported = isParentOfType(n, "export_statement");
  return (children: AstNode[]) =>
    createTypeInterface({
      exported,
      children: [
        // Replace t:ref with direct identifier
        children[0].type === "t:ref"
          ? createIdentifier({ name: children[0].render() })
          : children[0],
        ...children.slice(1),
      ],
    });
}
