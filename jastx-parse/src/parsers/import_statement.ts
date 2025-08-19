import { createImportDeclaration } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseImportStatement(n: SyntaxNode) {
  const type_only_import = !!n.children.find(
    (a) => !a.isNamed && a.type === "type"
  );

  return (children) =>
    createImportDeclaration({ typeOnly: type_only_import, children });
}
