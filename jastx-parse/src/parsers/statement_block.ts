import type { AstNode } from "jastx";
import { createBlock } from "jastx/build";

export function parseStatementBlock() {
  return (children: AstNode[]) => createBlock({ children });
}
