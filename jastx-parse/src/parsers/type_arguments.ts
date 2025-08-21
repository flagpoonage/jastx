import { createTypeReference } from "jastx/build";
import type { AstNode } from "../../../jastx/dist/types";

export function parseTypeArguments() {
  return (children: AstNode[]) =>
    children.map((a) => {
      return createTypeReference({ children: [a] });
    });
}
