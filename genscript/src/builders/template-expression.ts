import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const type = "expr:template";

export interface TemplateExpressionlProps {
  children?: any;
}

export interface TemplateExpressionlNode extends AstNode {
  type: typeof type;
  props: TemplateExpressionlProps;
}

export function createTemplateExpression(
  props: TemplateExpressionlProps
): TemplateExpressionlNode {
  const walker = createChildWalker(type, props);

  const children = walker.spliceAssertGroup([...EXPRESSION_OR_LITERAL_TYPES], {
    allowText: true,
  });

  if (walker.remainingChildren.length > 0) {
    throw new InvalidSyntaxError(
      `<${type}> must only have plain text, literal, or expression children. The following children are invalid:\n${walker.remainingChildren
        .map((a) => `- ${a.type}`)
        .join("\n")}`
    );
  }

  return {
    type: type,
    props,
    render: () =>
      `\`${children.reduce((acc, val) => {
        if (val.type === "text") {
          return `${acc}${val.render().replaceAll("`", "\\`")}`;
        } else {
          return `${acc}\${${val.render()}}`;
        }
      }, "")}\``,
  };
}
