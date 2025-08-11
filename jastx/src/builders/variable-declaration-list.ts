import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode } from "../types.js";

const type = "dclr:var-list";

export interface VariableDeclarationListProps {
  children: any;
  type: "const" | "var" | "let";
}

export interface VariableDeclarationListNode extends AstNode {
  type: typeof type;
  props: VariableDeclarationListProps;
}

export function createVariableDeclarationList(
  props: VariableDeclarationListProps
): VariableDeclarationListNode {
  const walker = createChildWalker(type, props);

  const variable_declarations = walker.spliceAssertGroup("dclr:var", {
    size: [1, undefined],
  });

  const remaining = walker.remainingChildren;

  if (remaining.length > 0) {
    throw new InvalidSyntaxError(
      `<${type}> has invalid children: ${remaining.map((a) => `<${a.type}>`)}`
    );
  }

  return {
    type,
    props,
    render: () => {
      return `${props.type} ${variable_declarations
        .map((a) => a.render())
        .join(",")}`;
    },
  };
}
