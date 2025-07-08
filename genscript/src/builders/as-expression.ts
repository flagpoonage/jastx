import { assertZeroChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";
import { stringRenderer } from "../utils.js";

const type = "expr:as";

export interface AsExpressionProps {
  children: any;
  type?: string;
}

export interface AsExpressionNode extends AstNode {
  type: typeof type;
  props: AsExpressionProps;
}

export function createAsExpression(props: AsExpressionProps): AsExpressionNode {
  const walker = createChildWalker(type, props);

  const p_type = walker.spliceAssertSingleOptional(["t:primitive", "p:type"]);

  const expr_node = walker.spliceAssertOneof(EXPRESSION_OR_LITERAL_TYPES, 1);

  if (props.type && p_type) {
    throw new InvalidSyntaxError(
      `<variable-declaration> cannot specify a literal type and a <p:type> or <type-primitive> child`
    );
  }

  const type_node = p_type ?? (props.type ? stringRenderer(props.type) : null);

  if (!type_node) {
    throw new InvalidSyntaxError(
      `<as-expression> expects a type attribute, or one of <p:type>/<type-primitive> child`
    );
  }

  return {
    type,
    props,
    render: () => {
      return `${expr_node.render()} as ${type_node.render()}`;
    },
  };
}
