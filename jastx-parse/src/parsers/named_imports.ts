import { createNamedImports } from "jastx/build";
import type { AstNode } from "../../../jastx/dist/types.js";

export function parseNamedImports() {
  return (children: AstNode[]) => createNamedImports({ children });
}
