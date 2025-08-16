import { assertMaxChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import { AstNode } from "../types.js";

const type = "t:infer";

export interface TypeInferProps {
  children: any;
}

export interface TypeInferNode extends AstNode {
  type: typeof type;
  props: TypeInferProps;
}

export function createTypeInfer(
  props: TypeInferProps
): TypeInferNode {
  assertMaxChildren(type, 1, props);

  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext("t:param");

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      ["t:param"],
      walker.remainingChildTypes
    );
  }

  return {
    type: type,
    props,
    render: () => `infer ${ident.render()}`
  };
}
