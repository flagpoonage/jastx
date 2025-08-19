import { createSourceFile } from "jastx/build";

export function parseProgram() {
  return (children) => createSourceFile({ type: "module", children });
}
