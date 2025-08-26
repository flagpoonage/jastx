import type { AstNode } from "jastx";
import type { SyntaxNode } from "tree-sitter";

export function passthrough(children: AstNode[]) {
  return children;
}

export function listUnnamedNodes(n: SyntaxNode) {
  const unnamed_nodes = n.children.filter((a) => !a.isNamed);
  console.log(
    "Unnamed nodes in",
    n.type,
    ...unnamed_nodes.map((a) => `\n- ${a.type}`)
  );

  return unnamed_nodes;
}

export function ensureArray<T>(v: T | T[]): T[] {
  return Array.isArray(v) ? v : [v];
}

export function hasUnnamedNode(n: SyntaxNode, type: string) {
  return !!n.children.find((a) => !a.isNamed && a.type === type);
}

export function isParentOfType(n: SyntaxNode, type: string) {
  return !!(n.parent?.type === type);
}

export function assertSingle<T>(n: T | T[]): asserts n is T {
  if (Array.isArray(n)) {
    throw new Error("Expected single result");
  }
}

export function markAsParsed(n: SyntaxNode) {
  (n as SyntaxNode & { jastxParsed: boolean }).jastxParsed = true;
}

export function isMarkedAsParsed(n: SyntaxNode) {
  return (n as SyntaxNode & { jastxParsed: boolean }).jastxParsed;
}
