import { createIfStatement } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { parseNode } from "../parse";

export function parseIfStatement(n: SyntaxNode) {
  const condition = n.childForFieldName("condition");

  if (!condition) {
    throw new Error("Expected condition child for if_statement");
  }

  const consequence = n.childForFieldName("consequence");

  if (!consequence) {
    throw new Error("Expected consequence for if_statement");
  }

  const condition_walker = condition.walk();
  if (!condition_walker.gotoFirstChild()) {
    throw new Error(
      `Expected child for if statement condition, but found none :/`
    );
  }

  console.log("ABOUT TO LOOK UP CONDITION", condition_walker.currentNode);

  const condition_node = parseNode(
    condition_walker.currentNode,
    condition_walker
  );

  const consequence_node = parseNode(consequence, consequence.walk());

  return createIfStatement({
    children: [
      ...(Array.isArray(condition_node) ? condition_node : [condition_node]),
      ...(Array.isArray(consequence_node)
        ? consequence_node
        : [consequence_node]),
    ],
  });
}
