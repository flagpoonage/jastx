import type { AstNode } from "jastx";
import { createReturnStatement } from "jastx/build";

export function parseReturnStatement() {
  return (children: AstNode[]) => createReturnStatement({ children });
}
