import { createExpressionStatement } from "jastx/build";
import type { AstNode } from "../../../jastx/dist/types.js";

export function parseExpressionStatement() {
  return (children: AstNode[]) => createExpressionStatement({ children });
}
