import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import { AstNode, LITERAL_PRIMITIVE_TYPES, TYPE_TYPES } from "../types.js";

const type = "t:cond";

export interface TypeConditionalProps {
  children: any;
}

export interface TypeConditionalNode extends AstNode {
  type: typeof type;
  props: TypeConditionalProps;
}

export function createTypeConditional(
  props: TypeConditionalProps
): TypeConditionalNode {
  const walker = createChildWalker(type, props);

  // A type conditional requires exactly 4 arguments
  // - The check type   - [T] extends X ? Y : Z
  // - The extends type - T extends [X] ? Y : Z
  // - The true type    - T extends X ? [Y] : Z
  // - The false type   - T extends X ? Y : [Z]
  const [check_type, extends_type, true_type, false_type] =
    walker.spliceAssertGroup([...TYPE_TYPES, ...LITERAL_PRIMITIVE_TYPES], {
      size: [4, 4],
    });

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      [...TYPE_TYPES],
      walker.remainingChildTypes
    );
  }

  return {
    type,
    props,
    render: () =>
      `${check_type.render()} extends ${extends_type.render()}?${true_type.render()}:${false_type.render()}`,
  };
}
