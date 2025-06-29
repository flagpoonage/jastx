import { assertZeroChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode } from "../types.js";

const type = "variable-declaration";

export interface VariableDeclarationProps {
  children: any;
}

export interface VariableDeclarationNode extends AstNode {
  type: typeof type;
  props: VariableDeclarationProps;
}

export function createVariableDeclaration(
  props: VariableDeclarationProps
): VariableDeclarationNode {
  const walker = createChildWalker(props);

  const p_type = walker.spliceAssertSingleOptional("p:type");
  const p_init = walker.spliceAssertSingleOptional("p:initializer");
  const p_name = walker.spliceAssertSingle("p:var-name");

  return {
    type,
    props,
    render: () => {
      return `${p_name.render()}${p_type ? `:${p_type.render()}` : ""}${
        p_init ? `=${p_init.render()}` : ""
      }`;
    },
  };
}
