import type { AstNode } from "jastx";
import { createIdentifier, createTypeAlias } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { isParentOfType } from "../util";

export function parseTypeAliasDeclaration(n: SyntaxNode) {
  const exported = isParentOfType(n, "export_statement");

  return (children: AstNode[]) =>
    createTypeAlias({
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
