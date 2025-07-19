import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import {
  AstNode,
  BLOCK_STATEMENTS_AND_DECLARATIONS,
  ElementType,
  EXPRESSION_OR_LITERAL_TYPES,
  omitFrom,
} from "../types.js";

const type = "if-statement";

export interface IfStatementProps {
  children: any;
}

export interface IfStatementNode extends AstNode {
  type: typeof type;
  props: IfStatementProps;
}

const allowed_body = [
  ...omitFrom(BLOCK_STATEMENTS_AND_DECLARATIONS, "var:statement"),
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

  return {
    type,
    props,
    render: () =>
      `if(${condition_node.render()})${body_node.render()}${
        body_node.type !== "block" && else_node ? ";" : ""
      }${
        else_node
          ? else_node.type === "block"
            ? `else${else_node.render()}`
            : `else ${else_node.render()}`
          : ""
      }`,
  };
}
