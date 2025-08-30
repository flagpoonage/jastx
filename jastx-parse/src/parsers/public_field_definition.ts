import type { AstNode, ModifierType } from "jastx";
import { createField } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { hasUnnamedNode, listUnnamedNodes, markAsParsed } from "../util";

export function parsePublicFieldDefinition(n: SyntaxNode) {
  const readonly = hasUnnamedNode(n, "readonly");
  const accessibility = n.namedChildren.find(
    (a) => a.type === "accessibility_modifier"
  );

  listUnnamedNodes(n);

  if (accessibility) {
    if (!["public", "private", "protected"].includes(accessibility.text)) {
      throw new Error(
        `Expected accessibility_modifier to be public, private, or protected in public_field_definition but found [${accessibility.text}]`
      );
    }

    markAsParsed(accessibility);
  }

  return (children: AstNode[]) =>
    createField({
      readonly,
      modifier: (accessibility?.text ?? undefined) as ModifierType | undefined,
      children,
    });
}
