import { createNamespaceImport } from "jastx/build";
import type { AstNode } from "../../../jastx/dist/types.js";

export function parseNamespaceImport() {
  return (children: AstNode[]) => createNamespaceImport({ children });
}
