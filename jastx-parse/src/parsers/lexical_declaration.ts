import {
  createVariableDeclarationList,
  createVariableStatement,
} from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import type { AstNode } from "../../../jastx/dist/types";

export function parseLexicalDeclaration(n: SyntaxNode) {
  const walker = n.walk();
  // TODO: Get the "typeOnly" property from a parent export statement
  walker.gotoParent();

  const var_kind = n.children.find(
    (a) => !a.isNamed && ["const", "var", "let"].includes(a.type)
  )?.type;

  if (!var_kind) {
    throw new Error(`Unexpected missing variable kind`);
  }

  return (children: AstNode[]) =>
    createVariableStatement({
      children: [
        createVariableDeclarationList({
          type: var_kind as ["const", "var", "let"][number],
          children,
        }),
      ],
    });
}
