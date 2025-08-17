import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_TYPES } from "../types.js";

const type = "spread-element";

export interface SpreadElementProps {
  children: any;
}

export interface SpreadElementNode extends AstNode {
  type: typeof type;
  props: SpreadElementProps;
}

export function createSpreadElement(
  props: SpreadElementProps
): SpreadElementNode {
  assertNChildren(type, 1, props);
  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext([
    "ident",
    ...EXPRESSION_TYPES,
    "l:array",
    "l:string",
  ]);

  return {
    type,
    props,
    render: () => `...${ident.render()}`,
  };
}
