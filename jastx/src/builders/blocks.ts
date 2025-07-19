import { createChildWalker } from "../child-walker.js";
import {
  InvalidChildrenError,
  InvalidExportedMembersError,
} from "../errors.js";
import { AstNode, BLOCK_STATEMENTS_AND_DECLARATIONS } from "../types.js";
import { isFunctionDeclaration } from "./function-declaration.js";
import { isVariableStatement } from "./variable-statement.js";

const type = "block";

export interface BlockProps {
  children?: any;
}

export interface BlockNode extends AstNode {
  type: typeof type;
  props: BlockProps;
}

const allowed_types = [...BLOCK_STATEMENTS_AND_DECLARATIONS];

export function createBlock(props: BlockProps): BlockNode {
  const walker = createChildWalker(type, props);

  const statements = walker.spliceAssertGroup(allowed_types);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      allowed_types,
      Array.from(new Set(walker.remainingChildren.map((a) => a.type)))
    );
  }

  const modified_statements = statements.filter(
    (a) =>
      (isVariableStatement(a) && a.props.exported) ||
      (isFunctionDeclaration(a) && a.props.exported)
  );

  if (modified_statements.length > 0) {
    throw new InvalidExportedMembersError(type, modified_statements);
  }

  return {
    type: type,
    props,
    render: () =>
      `{${statements.map((a) => a.render()).join(";")}${
        statements.length > 0 ? ";" : ""
      }}`,
  };
}
