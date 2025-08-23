import type { AstNode } from "jastx";
import { createAsExpression } from "jastx/build";

export function parseAsExpression() {
  return (children: AstNode[]) => createAsExpression({ children });
}
