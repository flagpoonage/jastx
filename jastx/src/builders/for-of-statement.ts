import { assertNChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_TYPES, STATEMENT_TYPES } from "../types.js";

const type = "stmt:for-of";

export interface ForOfProps {
  children: AstNode[] | AstNode;
  await?: boolean;
  variableType?: "const" | "let" | "var";
}

export interface ForOfNode extends AstNode {
  type: typeof type;
  props: ForOfProps;
}

export function isForOf(v: AstNode): v is ForOfNode {
  return v.type === "stmt:for-of";
}

export function createForOfStatement(props: ForOfProps): ForOfNode {
  assertNChildren(type, 3, props);

  const { await: _await = false, variableType = "const" } = props;

  const walker = createChildWalker(type, props);

  const [ident, iterable, block] = walker.spliceAssertExactPath(
    [
      "ident",
      ["ident", "l:string", "l:object", "l:array", ...EXPRESSION_TYPES],
      ["block", ...STATEMENT_TYPES],
    ],
    { noTrailing: true }
  );

  assertValue(ident);
  assertValue(iterable);
  assertValue(block);

  return {
    type: type,
    props,
    render: () =>
      `for${
        _await ? ` await` : ""
      }(${variableType} ${ident.render()} of ${iterable.render()})${block.render()}`,
  };
}
