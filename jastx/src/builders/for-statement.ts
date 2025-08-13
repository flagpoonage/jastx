import { assertMaxChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_TYPES, STATEMENT_TYPES } from "../types.js";

const type = "stmt:for";

export interface ForStatementProps {
  children: AstNode[] | AstNode;
  /**
   * Specifies in the amibgguos case of a missing child,
   * whether that child refers to the condition or the
   * incrementer. By default, it refers to the incrementer
   * so this flag can be enabled to explicity refer to
   * the condition.
   *
   * @example
   * <stmt:for>
   *   <dclr:var-list>
   *     ...
   *   </dclr:var-list>
   *   <expr:{something} />
   *   <block />
   * </stmt:for>
   *
   * By default this will render
   * for ({vars};{expr};) { ... }
   *
   * If the noCondition flag is set, this will instead render
   * for ({vars};;{expr}) { ... }
   *
   */
  noCondition?: boolean;
}

export interface ForStatementNode extends AstNode {
  type: typeof type;
  props: ForStatementProps;
}

export function isForStatement(v: AstNode): v is ForStatementNode {
  return v.type === "stmt:for";
}

export function createForStatement(props: ForStatementProps): ForStatementNode {
  assertMaxChildren(type, 4, props);

  const { noCondition = false } = props;

  const walker = createChildWalker(type, props);

  const [varlist, c_a, c_b, block] = walker.spliceAssertExactPath([
    ["dclr:var-list", null],
    [...EXPRESSION_TYPES, null],
    [...EXPRESSION_TYPES, null],
    ["block", ...STATEMENT_TYPES],
  ]);

  assertValue(block);

  const condition = c_a && c_b ? c_a : c_a && !noCondition ? c_a : null;
  const incrementer = c_a && c_b ? c_b : c_a && noCondition ? c_a : null;

  return {
    type: type,
    props,
    render: () =>
      `for(${varlist ? varlist.render() : ""};${
        condition ? condition.render() : ""
      };${incrementer ? incrementer.render() : ""})${block.render()}`,
  };
}
