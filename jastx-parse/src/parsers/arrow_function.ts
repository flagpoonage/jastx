import type { AstNode } from "jastx";
import { createArrowFunction } from "jastx/build";

export function parseArrowFunction() {
  return (children: AstNode[]) => {
    return createArrowFunction({
      children,
    });
  };
}
