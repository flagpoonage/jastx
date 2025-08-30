import {
  createHeritageClause,
  createIdentifier,
  createTypeReference,
} from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { parseNode } from "../parse";
import { ensureArray } from "../util";

export function parseExtendsClause(n: SyntaxNode) {
  const name = n.childForFieldName("value");

  if (!name) {
    throw new Error("Expected value for extends_clause");
  }

  const type_args = n.childForFieldName("type_arguments");

  if (type_args) {
    const parsed_args = parseNode(type_args, type_args.walk());
    return createHeritageClause({
      kind: "extends",
      children: [
        createTypeReference({
          children: [
            createIdentifier({ name: name.text }),
            ...ensureArray(parsed_args),
          ],
        }),
      ],
    });
  } else {
    return createHeritageClause({
      kind: "extends",
      children: [createIdentifier({ name: name.text })],
    });
  }
}
