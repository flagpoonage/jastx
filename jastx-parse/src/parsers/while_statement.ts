import { createWhileStatement } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { parseNode } from "../parse";
import { ensureArray } from "../util";

export function parseWhileStatement(n: SyntaxNode) {
  const condition = n.childForFieldName("condition");

  if (!condition) {
    throw new Error("Expected condition child for while_statement");
  }

  const body = n.childForFieldName("body");

  if (!body) {
    throw new Error("Expected body for while_statement");
  }

  // Condition is always a parenthesized_expression, which we don't
  // consider it to be in jastx. The first child is the _actual_
  // expression we want.
  const internal_condition = condition.namedChildren[0];

  if (!internal_condition) {
    throw new Error(
      "Expected internal condition inside parenthesized_expression for while_statement"
    );
  }

  const condition_walker = internal_condition.walk();

  const condition_node = parseNode(
    condition_walker.currentNode,
    condition_walker
  );
  const body_node = parseNode(body, body.walk());

  return createWhileStatement({
    children: [...ensureArray(condition_node), ...ensureArray(body_node)],
  });
}
