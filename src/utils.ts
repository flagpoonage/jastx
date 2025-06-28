import type { LiteralNode } from './builders/literal.js';
import {
  AstNode,
  ElementType,
  Stringable,
  UsageType,
  WithChildren,
} from './types.js';

export function renderValue(v: AstNode | Stringable) {
  if (typeof v === 'string') {
    return v;
  }

  if (!('type' in v)) {
    return v.toString();
  }

  return v.render();
}

export function renderWithDocs(docs: AstNode | null, v: AstNode | Stringable) {
  return docs ? `${docs.render()}\n${renderValue(v)}` : renderValue(v);
}

export function hasOne(nodes: unknown[]) {
  return nodes.length === 1;
}

export function hasMany(nodes: unknown[]) {
  return nodes.length > 1;
}

export function hasSome(nodes: unknown[]) {
  return nodes.length > 0;
}

export function hasNone(nodes: unknown[]) {
  return nodes.length === 0;
}

export function hasOneChild<T extends object>(
  props: WithChildren<T>,
): props is T & { children: AstNode[] } {
  return props.children && props.children.length === 1;
}

export function hasNoChildren<T extends object>(
  props: WithChildren<T>,
): props is T & { children?: never[] } {
  return !props.children || props.children.length === 0;
}

export function hasSomeChildren<T extends object>(
  props: WithChildren<T>,
): props is T & { children?: never[] } {
  return !props.children || props.children.length === 0;
}

export function hasManyChildren<T extends object>(
  props: WithChildren<T>,
): props is T & { children: AstNode[] } {
  return props.children && props.children.length > 1;
}

export function makeLiteralNodes(arr: string[]) {
  return arr.map<LiteralNode>((a) => ({
    type: 'literal',
    props: {
      value: a,
    },
    render: () => a,
  }));
}

export function getNodeUsage(node: AstNode): UsageType {
  switch (node.type) {
    case 'if-group':
    case 'if': {
      return 'block';
    }
    case 'line-break':
    case 'literal':
    case 'comment': {
      return 'literal';
    }
    case 'const':
    case 'assignment':
    case 'import':
    case 'return':
    case 'function-statement':
    case 'export':
    case 'type-assignment':
    case 'throw':
    case 'type-interface':
    case 'type-union':
    case 'type-intersection': {
      return 'statement';
    }
    case 'array-literal':
    case 'call':
    case 'object-literal':
    case 'arrow-function':
    case 'cast':
    case 'string':
    case 'new':
    case 'logic-group':
    case 'compare': {
      return 'expression';
    }
    case 'declare-global':
    case 'declare-module':
    case 'declare-namespace':
    case 'function-declaration':
    case 'declare': {
      return 'declaration';
    }
    case 'fragment': {
      return 'fragment';
    }
    default: {
      return 'meta';
    }
  }
}

export function groupNodesByUsage(nodes: AstNode[]) {
  return nodes.reduce(
    (acc, val, i) => {
      acc[getNodeUsage(val)].push([i, val]);
      return acc;
    },
    {
      block: [],
      expression: [],
      statement: [],
      meta: [],
      literal: [],
      declaration: [],
    } as Record<UsageType, [number, AstNode][]>,
  );
}

export function sortGroupedNodes(nodes: [number, AstNode][]) {
  return nodes.sort((a, b) => a[0] - b[0]).map((a) => a[1]);
}

export function getExpressableNodes(nodes: AstNode[]) {
  return nodes.filter(
    (a) => getNodeUsage(a) === 'expression' || a.type === 'literal',
  );
}

export function splitMetaNodes(nodes: AstNode[]) {
  const groups = {
    meta: [] as AstNode[],
    non_meta: [] as AstNode[],
  };

  for (const node of nodes) {
    if (getNodeUsage(node) === 'meta') {
      groups.meta.push(node);
    } else {
      groups.non_meta.push(node);
    }
  }

  return groups;
}

export function createNodeSplitter<T extends ElementType>(...types: T[]) {
  return (nodes: AstNode[]) => {
    return nodes.reduce(
      (acc, val) => {
        if (types.includes(val.type as T)) {
          acc.includes.push(val);
        } else {
          acc.excludes.push(val);
        }
        return acc;
      },
      { includes: [], excludes: [] } as {
        includes: AstNode[];
        excludes: AstNode[];
      },
    );
  };
}

export function isNodeAllowedInTopLevel(node: AstNode) {
  // Returns don't make sense in the top level
  return node.type !== 'file' && node.type !== 'return';
}

export function isNodeAllowedOutsideTopLevel(node: AstNode) {
  // Imports and exports are _only_ allowed in the top level.
  // Declarations only make sense in the top level
  return (
    node.type !== 'file' &&
    node.type !== 'export' &&
    node.type !== 'import' &&
    getNodeUsage(node) !== 'declaration'
  );
}

export function hasNodesAfterTerminal(nodes: AstNode[]) {
  // Throws and returns are terminal nodes within a scope. You can't have
  // code that follows them within the same scope or closure.
  const t_index = nodes.findIndex(
    (a) => a.type === 'return' || a.type === 'throw',
  );
  if (t_index === -1) {
    return false;
  }

  return t_index < nodes.length - 1;
}

export function assertNoNodesAfterTerminal(
  callerNode: string,
  nodes: AstNode[],
) {
  if (hasNodesAfterTerminal(nodes)) {
    throw new Error(
      `Invalid ${callerNode}. Terminal nodes (return, throw, continue break) cannot be followed by other nodes within the same scope`,
    );
  }
}

export function getValueAsArray<T>(nodes: unknown): T[] {
  if (!nodes) {
    return [];
  }

  if (!Array.isArray(nodes)) {
    return [nodes] as T[];
  }

  return nodes;
}

export function getNodesAsArray(nodes: AstNode[]) {
  return getValueAsArray<AstNode>(nodes);
}

export function normalizeStringLineEndings(str: string) {
  return str.replaceAll('\r\n', '\n').replaceAll('\r', '');
}

export function splitToLines(str: string, normalize = true) {
  return normalize
    ? normalizeStringLineEndings(str).split('\n')
    : str.split('\n');
}
