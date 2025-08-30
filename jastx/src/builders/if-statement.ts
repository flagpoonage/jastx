import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import type { AstNode, ElementType } from "../types.js";
import {
  EXPRESSION_OR_LITERAL_TYPES,
  omitFrom,
  STATEMENT_TYPES,
} from "../types.js";

const type = "stmt:if";

export interface IfStatementProps {
  children: any;
}

export interface IfStatementNode extends AstNode {
  type: typeof type;
  props: IfStatementProps;
}

const allowed_body = [
  ...omitFrom(STATEMENT_TYPES, "stmt:var"),
  "block",
] as ElementType[];

export function createIfStatement(props: IfStatementProps): IfStatementNode {
  const walker = createChildWalker(type, props);

  const condition_node = walker.spliceAssertNext([
    ...EXPRESSION_OR_LITERAL_TYPES,
    "ident",
  ]);

  const body_node = walker.spliceAssertNext(allowed_body);
  const else_node = walker.spliceAssertNextOptional(allowed_body);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      allowed_body,
      walker.remainingChildTypes
    );
  }

  const body_requires_block = !["block", "stmt:expr"].includes(body_node.type);
  const else_requires_block = !["block", "stmt:expr"].includes(body_node.type);

  return {
    type,
    props,
    render: () =>
      `if(${condition_node.render()})${
        body_requires_block ? `{${body_node.render()}}` : body_node.render()
      }${body_node.type !== "block" && else_node ? ";" : ""}${
        else_node
          ? else_node.type === "block"
            ? `else${else_node.render()}`
            : `else ${
                else_requires_block
                  ? `{${else_node.render()}}`
                  : else_node.render()
              }`
          : ""
      }`,
  };
}
