import type { AstNode } from "../../../jastx/dist/types";

export function parseTypeAnnotation() {
  return (children: AstNode[]) => children;
}
