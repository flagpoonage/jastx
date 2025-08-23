import type { AstNode } from "jastx";
import { createIfStatement } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { parseNode } from "../parse";
import { ensureArray } from "../util";

function getElseAlternative(alt: SyntaxNode | null): AstNode[] {
  if (!alt) {
    return [];
  }

  if (!alt.isNamed || alt.type !== "else_clause") {
    throw new Error("Expected else_clause in if_statement alternative");
  }

  return ensureArray(parseNode(alt, alt.walk()));
}

export function parseIfStatement(n: SyntaxNode) {
  const condition = n.childForFieldName("condition");

  if (!condition) {
    throw new Error("Expected condition child for if_statement");
  }

  const consequence = n.childForFieldName("consequence");

  if (!consequence) {
    throw new Error("Expected consequence for if_statement");
  }

  // Condition is always a parenthesized_expression, which we don't
  // consider it to be in jastx. The first child is the _actual_
  // expression we want.
  const internal_condition = condition.namedChildren[0];

  if (!internal_condition) {
    throw new Error(
      "Expected internal condition inside parenthesized_expression for if_statement"
    );
  }

  const condition_walker = internal_condition.walk();

  const condition_node = parseNode(
    condition_walker.currentNode,
    condition_walker
  );

  const consequence_node = parseNode(consequence, consequence.walk());

  const alternative = getElseAlternative(n.childForFieldName("alternative"));

  return createIfStatement({
    children: [
      ...ensureArray(condition_node),
      ...ensureArray(consequence_node),
      ...alternative,
    ],
  });
}
