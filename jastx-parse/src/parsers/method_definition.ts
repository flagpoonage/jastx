import type { AstNode, ModifierType } from "jastx";
import {
  createGetAccessor,
  createMethod,
  createSetAccessor,
} from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { hasUnnamedNode } from "../util";

export function parseMethodDefinition(n: SyntaxNode) {
  const async = hasUnnamedNode(n, "async");
  const is_getter = hasUnnamedNode(n, "get");
  const is_setter = hasUnnamedNode(n, "set");

  const access_modifier = n.namedChildren.find(
    (a) => a.type === "accessibility_modifier"
  );
  const modifier = access_modifier
    ? (access_modifier.text as ModifierType)
    : undefined;

  if (is_getter) {
    return (children: AstNode[]) => createGetAccessor({ modifier, children });
  } else if (is_setter) {
    return (children: AstNode[]) => createSetAccessor({ modifier, children });
  }

  return (children: AstNode[]) => createMethod({ modifier, children, async });
}
