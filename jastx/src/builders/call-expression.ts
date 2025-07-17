import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const type = "expr:call";

export interface CallExpressionProps {
  children: any;
  optionalChain?: boolean;
}

export interface CallExpressionNode extends AstNode {
  type: typeof type;
  props: CallExpressionProps;
}

export function createCallExpression(
  props: CallExpressionProps
): CallExpressionNode {
  const walker = createChildWalker(type, props);

  if (walker.remainingChildren.length === 0) {
    throw new InvalidSyntaxError(`<${type}> must have at least one child`);
  }

  // Can't specify a number literal as the call, because that creates invalid syntax like 1.toString();
  // The tokenizer isn't able to parse that, because 1. starts parsing a decimal rather than a property
  // access. Number literals need to be wrapped in parenthesis expresssions. (1).toString();
  const callee = walker.spliceAssertNext(
    (["ident", ...EXPRESSION_OR_LITERAL_TYPES] as const).filter(
      (v) => v !== "l:number"
    )
  );

  const args = walker.spliceAssertGroup([...EXPRESSION_OR_LITERAL_TYPES]);

  return {
    type,
    props,
    render: () =>
      `${callee.render()}${props.optionalChain ? "?." : ""}(${args
        .map((x) => x.render())
        .join(",")})`,
  };
}
