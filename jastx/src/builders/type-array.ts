import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, TYPE_TYPES } from "../types.js";

const type = "t:array";

export interface TypeArrayProps {
  children: any;
}

export interface TypeArrayNode extends AstNode {
  type: typeof type;
  props: TypeArrayProps;
}

function canCauseAmbiguity(node: AstNode) {
  return ["t:function", "t:union", "t:intersection", "t:cond"].includes(
    node.type
  );
}

export function createTypeArray(props: TypeArrayProps): TypeArrayNode {
  assertNChildren(type, 1, props);

  const walker = createChildWalker(type, props);
  const arrayed_type = walker.spliceAssertNext([...TYPE_TYPES]);

  return {
    type,
    props,
    render: () =>
      `${
        canCauseAmbiguity(arrayed_type)
          ? `(${arrayed_type.render()})`
          : arrayed_type.render()
      }[]`,
  };
}
