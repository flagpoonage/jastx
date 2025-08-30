import type { AstNode } from "jastx";
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

  if (is_getter) {
    return (children: AstNode[]) => createGetAccessor({ children });
  } else if (is_setter) {
    return (children: AstNode[]) => createSetAccessor({ children });
  }

  return (children: AstNode[]) => createMethod({ children, async });
}
