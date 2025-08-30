import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import type { AstNode } from "../types.js";
import { VALUE_TYPES } from "../types.js";

const type = "export-default";

export interface ExportDefaultProps {
  children: any;
  typeOnly?: boolean;
}

export interface ExportDefaultNode extends AstNode {
  type: typeof type;
  props: ExportDefaultProps;
}

export function isExportDefault(node: AstNode): node is ExportDefaultNode {
  return node.type === type;
}

export function createExportDefault(
  props: ExportDefaultProps
): ExportDefaultNode {
  assertNChildren(type, 1, props);

  const walker = createChildWalker(type, props);

  const value_node = walker.spliceAssertNext([...VALUE_TYPES]);

  return {
    type,
    props,
    render: () => `export default ${value_node.render()}`,
  };
}
