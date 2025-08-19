import { createNamedImports } from "jastx/build";

export function parseNamedImports() {
  return (children) => createNamedImports({ children });
}
