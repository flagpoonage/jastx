import { createSourceFile } from "jastx/build";
import type { AstNode } from "../../../jastx/dist/types.js";

export function parseProgram() {
  return (children: AstNode[]) =>
    createSourceFile({ type: "module", children });
}
