import { assertMaxChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, TYPE_TYPES } from "../types.js";

const type = "stmt:try";

export interface TryStatementProps {
  children: any;
}

export interface TryStatementNode extends AstNode {
  type: typeof type;
  props: TryStatementProps;
}

export function createTryStatement(props: TryStatementProps): TryStatementNode {
  assertMaxChildren(type, 3, props);

  const walker = createChildWalker(type, props);

  const [try_block, catch_clause, finally_block] = walker.spliceAssertExactPath(
    ["block", ["catch-clause", null], ["block", null]],
    { noTrailing: true }
  );

  assertValue(try_block);

  if (!catch_clause && !finally_block) {
    throw new InvalidSyntaxError(
      `<${type}> must contain either a <catch-clause> or a final <block> or both`
    );
  }

  return {
    type,
    props,
    render: () =>
      `try${try_block.render()}${catch_clause ? catch_clause?.render() : ""}${
        finally_block ? `finally${finally_block.render()}` : ""
      }`,
  };
}

// This is colocated because it's only relevant to try statements
const catch_type = "catch-clause";

export interface CatchClauseProps {
  children: any;
}

export interface CatchClauseNode extends AstNode {
  type: typeof catch_type;
  props: CatchClauseProps;
}

export function createCatchClause(props: CatchClauseProps): CatchClauseNode {
  assertMaxChildren(catch_type, 3, props);

  const walker = createChildWalker(catch_type, props);

  const [ident_node, ident_type, block] = walker.spliceAssertExactPath(
    ["ident", [...TYPE_TYPES, null], "block"],
    { noTrailing: true }
  );

  assertValue(ident_node);
  assertValue(block);

  return {
    type: catch_type,
    props,
    render: () =>
      `catch(${ident_node.render()}${
        ident_type ? `:${ident_type.render()}` : ""
      })${block.render()}`,
  };
}
