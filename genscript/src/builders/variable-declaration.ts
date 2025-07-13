import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES, TYPE_TYPES } from "../types.js";
import { createTextNode } from "./text-node.js";

const type = "var:declaration";

export interface VariableDeclarationProps {
  children?: any;
}

export interface VariableDeclarationNode extends AstNode {
  type: typeof type;
  props: VariableDeclarationProps;
}

export function createVariableDeclaration(
  props: VariableDeclarationProps
): VariableDeclarationNode {
  const walker = createChildWalker(type, props);

  const p_name = walker.spliceAssertSingle(
    ["ident", "bind:array", "bind:object"],
    1
  );

  const p_type = walker.spliceAssertSingleOptional([...TYPE_TYPES], 1);

  const p_init = walker.spliceAssertNext([...EXPRESSION_OR_LITERAL_TYPES]);

  if (walker.remainingChildren !== 1) {
    throw new InvalidSyntaxError(`<${type}> can only have a single initializ`);
  }

  const type_node =
    p_type ?? (props.type ? createTextNode({ value: props.type }) : null);

  if (walker.remainingChildren.length > 1) {
    throw new InvalidSyntaxError(
      `<${type}> cannot have multiple initializer expressions: ${walker.remainingChildren.map(
        (a) => (a.type ? `<${a.type}>` : String(a))
      )}`
    );
  }

  const init = walker.remainingChildren[0];

  return {
    type,
    props,
    render: () => {
      return `${name_node.render()}${
        type_node ? `:${type_node.render()}` : ""
      }${init ? `=${init.render()}` : ""}`;
    },
  };
}
