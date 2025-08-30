import type { AstNode } from "jastx";
import { createTypeArray } from "jastx/build";

export function parseArrayType() {
  return (children: AstNode[]) => createTypeArray({ children });
}
