import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import {
  AstNode,
  omitFrom,
  STATEMENT_TYPES,
  TOP_LEVEL_DECLARATION_TYPES,
} from "../types.js";

const type = "source-file";

export interface SourceFileProps {
  children: any;
  // TODO: No effect currently.
  type: "script" | "module";
}

export interface SourceFileNode extends AstNode {
  type: typeof type;
  props: SourceFileProps;
}

export function isSourceFile(node: AstNode): node is SourceFileNode {
  return node.type === type;
}

export function createSourceFile(props: SourceFileProps): SourceFileNode {
  const walker = createChildWalker(type, props);

  const values = walker.spliceAssertGroup(
    omitFrom(
      [
        ...TOP_LEVEL_DECLARATION_TYPES,
        ...STATEMENT_TYPES,
        "t:alias",
        "t:interface_",
      ],
      // Return statements make no sense in the top level. But really
      // they can't be anywhere except inside functions. That requires deep traversal
      // though which we're avoiding for now.
      "stmt:return"
    )
  );

  return {
    type,
    props,
    render: () => `${values.map((a) => a.render()).join(";")}`,
  };
}
