import type { AstNode } from "jastx";
import { createHeritageClause } from "jastx/build";

export function parseExtendsTypeClause() {
  return (children: AstNode[]) =>
    createHeritageClause({
      kind: "extends",
      children: children,
    });
}
