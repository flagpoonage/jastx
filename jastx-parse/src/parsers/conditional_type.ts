import type { AstNode } from "jastx";
import { createTypeConditional } from "jastx/build";

export function parseConditionalType() {
  return (children: AstNode[]) =>
    createTypeConditional({
      children,
    });
}
