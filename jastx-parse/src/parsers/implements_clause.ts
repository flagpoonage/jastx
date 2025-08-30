import type { AstNode } from "jastx";
import { createHeritageClause } from "jastx/build";

export function parseImplementsClause() {
  return (children: AstNode[]) =>
    createHeritageClause({
      kind: "implements",
      children,
    });
}
