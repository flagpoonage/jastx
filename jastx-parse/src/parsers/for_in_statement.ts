import type { AstNode } from "jastx";
import type { ForInStatementProps, ForOfStatementProps } from "jastx/build";
import { createForInStatement, createForOfStatement } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { hasUnnamedNode } from "../util";

export function parseForInStatement(n: SyntaxNode) {
  const var_kind = n.children.find(
    (a) => !a.isNamed && ["const", "let", "var"].includes(a.type)
  );
  const in_kind = n.children.find(
    (a) => !a.isNamed && ["of", "in"].includes(a.type)
  );

  const has_await = hasUnnamedNode(n, "await");

  if (!in_kind) {
    throw new Error(`Expected in or of kind for for_in_statement`);
  }

  if (in_kind.type === "in") {
    return (children: AstNode[]) =>
      createForInStatement({
        variableType: var_kind?.type as ForInStatementProps["variableType"],
        children,
      });
  } else {
    return (children: AstNode[]) =>
      createForOfStatement({
        variableType: var_kind?.type as ForOfStatementProps["variableType"],
        await: has_await,
        children,
      });
  }
}
