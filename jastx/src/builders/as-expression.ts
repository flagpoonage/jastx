import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES, TYPE_TYPES } from "../types.js";

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
  assertNChildren(type, 2, props);

  const walker = createChildWalker(type, props);

  // as-expression can't use value types because it can't directly use an arrow-function
  // () => { return void 0; } as unknown as invalid syntax, it needs to be
  // (() => { return void 0; }) as unknown
  const expr_node = walker.spliceAssertNext([
    ...EXPRESSION_OR_LITERAL_TYPES,
    "ident",
  ]);

  const requires_parens = expr_node.type === "arrow-function";

  const type_node = walker.spliceAssertNext([...TYPE_TYPES]);

  return {
    type,
    props,
    render: () => {
      return `${
        requires_parens ? `(${expr_node.render()})` : expr_node.render()
      } as ${type_node.render()}`;
    },
  };
}
