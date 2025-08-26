import type { AstNode } from "jastx";
import { createClassDeclaration, createIdentifier } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { isParentOfType, markAsParsed } from "../util";

export function parseClassDeclaration(n: SyntaxNode) {
  const exported = isParentOfType(n, "export_statement");
  const name = n.childForFieldName("name");

  if (!name || name.type !== "type_identifier") {
    throw new Error("Expected name for class declaration");
  }

  markAsParsed(name);

  return (children: AstNode[]) =>
    createClassDeclaration({
      exported,
      children: [createIdentifier({ name: name.text }), ...children],
    });
}
