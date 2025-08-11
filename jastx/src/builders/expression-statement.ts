import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AmbiguousParserError } from "../errors.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const type = "stmt:expr";

export interface ExpressionStatementProps {
  children: any;
}

export interface ExpressionStatementNode extends AstNode {
  type: typeof type;
  props: ExpressionStatementProps;
}

export function createExpressionStatement(
  props: ExpressionStatementProps
): ExpressionStatementNode {
  assertNChildren(type, 1, props);

  const walker = createChildWalker(type, props);

  // as-expression can't use value types because it can't directly use an arrow-function
  // () => { return void 0; } as unknown as invalid syntax, it needs to be
  // (() => { return void 0; }) as unknown
  const expr_node = walker.spliceAssertNext([
    ...EXPRESSION_OR_LITERAL_TYPES,
    "ident",
  ]);

  if (expr_node.type === "expr:function") {
    throw new AmbiguousParserError(
      `<${type}> can not have an <expr:function> expression inside, because the code produced would be amibguos and ultimately resolved as a function declaration instead. You can just use a function declaration directly here.`
    );
  }

  return {
    type,
    props,
    render: expr_node.render,
  };
}
