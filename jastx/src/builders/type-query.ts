import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode } from "../types.js";

const type = "t:query";

export interface TypeQueryProps {
  children: any;
}

export interface TypeQueryNode extends AstNode {
  type: typeof type;
  props: TypeQueryProps;
}

export function createTypeQuery(props: TypeQueryProps): TypeQueryNode {
  assertNChildren(type, 1, props);

  const walker = createChildWalker(type, props);
  const ident = walker.spliceAssertNext("ident");

  return {
    type,
    props,
    render: () => `typeof ${ident.render()}`,
  };
}
