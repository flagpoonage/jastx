import { createSourceFile, createVariableStatement } from "jastx/build";
import type { AstNode } from "../../../jastx/dist/types.js";

export function parseProgram() {
  return (children: AstNode[]) =>
    createSourceFile({
      type: "module",
      children: children.map((a) => {
        if (a.type === "dclr:var-list") {
          return createVariableStatement({
            children: [a],
          });
        }

        return a;
      }),
    });
}
