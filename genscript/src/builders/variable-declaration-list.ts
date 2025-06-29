import { InvalidSyntaxError } from "src/errors.js";
import { assertZeroChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode } from "../types.js";

const type = "variable-declaration-list";

export interface VariableDeclarationListProps {
  children: any;
  type: "const" | "var" | "let";
}

export interface VariableDeclarationListNode extends AstNode {
  type: typeof type;
  props: VariableDeclarationListProps;
}

export function createVariableDeclaration(
  props: VariableDeclarationListProps
): VariableDeclarationListNode {
  const walker = createChildWalker(props);

  const variable_declarations = walker.spliceAssertGroup(
    "variable-declaration",
    [1, undefined]
  );

  const remaining = walker.remainingChildren;

  if (remaining.length > 0) {
    throw new InvalidSyntaxError(
      `<variable-declaration> has invalid children: ${remaining.map(
        (a) => `<${a.type}>`
      )}`
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
