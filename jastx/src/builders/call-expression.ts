import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import {
  AstNode,
  EXPRESSION_OR_LITERAL_TYPES,
  isUnaryExpressionType,
  TYPE_TYPES,
} from "../types.js";

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
  const callee = walker.spliceAssertNext([
    "ident",
    ...EXPRESSION_OR_LITERAL_TYPES,
  ] as const);

  const type_args = walker.spliceAssertGroup([...TYPE_TYPES]);

  const args = walker.spliceAssertGroup([...EXPRESSION_OR_LITERAL_TYPES]);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidSyntaxError(
      `<${type}> has invalid children:\n${walker.remainingChildren
        .map((a) => {
          if (a === "string") {
            return `- <text {${a}}>`;
          }

          return `- <${a}>`;
        })
        .join("\n")}`
    );
  }

  const requires_parens =
    isUnaryExpressionType(callee.type) ||
    callee.type === "l:number" ||
    callee.type === "arrow-function";

  return {
    type,
    props,
    render: () =>
      `${requires_parens ? `(${callee.render()})` : callee.render()}${
        props.optionalChain ? "?." : ""
      }${
        type_args.length > 0
          ? `<${type_args.map((a) => a.render()).join(",")}>`
          : ""
      }(${args.map((x) => x.render()).join(",")})`,
  };
}
