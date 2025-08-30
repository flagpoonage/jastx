import { createIdentifier, createTypeReference } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { parseNode } from "../parse";

export function parseGenericType(n: SyntaxNode) {
  const name = n.childForFieldName("name");

  if (!name) {
    throw new Error("Expected name for generic_type");
  }

  const type_arguments = n.childForFieldName("type_arguments");

  if (!type_arguments) {
    throw new Error("Expected type_arguments for generic_type");
  }

  const type_arg_walker = type_arguments.walk();
  const output = parseNode(type_arguments, type_arg_walker);

  return createTypeReference({
    children: [
      createIdentifier({ name: name.text }),
      ...(Array.isArray(output) ? output : [output]),
    ],
  });
}
