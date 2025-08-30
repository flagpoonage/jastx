import { createParameter, createTypeReference } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { parseNode } from "../parse";
import { ensureArray } from "../util";

export function getParameterType(t: SyntaxNode | null) {
  if (!t) {
    return null;
  }

  if (t.type !== "type_annotation") {
    throw new Error(
      `Expected type_annotation for type field of required_parameter`
    );
  }

  return ensureArray(parseNode(t, t.walk()))[0];
}
export function parseOptionalParameter(n: SyntaxNode) {
  const pattern_node = n.childForFieldName("pattern");

  if (!pattern_node) {
    throw new Error("Expected pattern field for optional_parameter");
  }

  const type = getParameterType(n.childForFieldName("type"));

  const type_child =
    type?.type === "ident"
      ? createTypeReference({
          children: [type],
        })
      : type;

  const pattern_child = parseNode(pattern_node, pattern_node.walk());

  return createParameter({
    modifier: "optional",
    children: [pattern_child, type_child].filter(Boolean),
  });
}
