import type { AstNode } from "jastx";
import { createParensExpression } from "jastx/build";

export function parseParenthesizedExpression() {
  return (children: AstNode[]) => createParensExpression({ children });
}
