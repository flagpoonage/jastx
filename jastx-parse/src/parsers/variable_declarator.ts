import { createVariableDeclaration } from "jastx/build";
import type { AstNode } from "../../../jastx/dist/types.js";

export function parseVariableDeclarator() {
  return (children: AstNode[]) =>
    createVariableDeclaration({
      children,
    });
}
