import type { AstNode } from "jastx";
import {
  createHeritageClause,
  createHeritageIdentifier,
  createIdentifier,
  createTypeParameter,
} from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { assertSingle } from "../util";

function getHeritageIdentifer(n: SyntaxNode) {
  // Tree-sitter actually makes more sense than typescript here. It just
  // defines an extends clause as a generic type. Typescript instead has
  // the whole "HeritageIdentifier" thing which is annoying.
  if (n.type !== "generic_type") {
    return createIdentifier({ name: n.text });
  }

  const type_arguments = n.childForFieldName("type_arguments");

  if (!type_arguments) {
    throw new Error(
      "Expected type_arguments field for generic_type as extends_type_clause type field"
    );
  }
}

export function parseExtendsTypeClause(n: SyntaxNode) {
  const type = n.childForFieldName("type");

  if (!type) {
    throw new Error("Expected type field for extends_type_clause");
  }

  const heritage_ident = getHeritageIdentifer(type);

  assertSingle(heritage_ident);

  console.log("HERITAGE IDENT", JSON.stringify(heritage_ident));

  return createHeritageClause({
    kind: "extends",
    children: [
      heritage_ident.type === "t:ref"
        ? createHeritageIdentifier({
            children: heritage_ident.props.children.map((a: AstNode) =>
              createTypeParameter({ children: [a] })
            ),
          })
        : heritage_ident,
    ],
  });
}
