import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError, InvalidSyntaxError } from "../errors.js";
import { AstNode } from "../types.js";

const type = "dclr:class";

export interface ClassDeclarationProps {
  children: any;
  exported?: boolean;
}

export interface ClassDeclarationNode extends AstNode {
  type: typeof type;
  props: ClassDeclarationProps;
}

export function isClassDeclaration(
  node: AstNode
): node is ClassDeclarationNode {
  return node.type === type;
}

export function createClassDeclaration(
  props: ClassDeclarationProps
): ClassDeclarationNode {
  const { exported = false } = props;

  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext("ident");

  const type_parameters = walker.spliceAssertGroup("t:param");

  const heritage_a = walker.spliceAssertNextOptional("heritage-clause");
  const heritage_b = walker.spliceAssertNextOptional("heritage-clause");

  if (
    heritage_a &&
    heritage_b &&
    heritage_a.props.kind === heritage_b.props.kind
  ) {
    throw new InvalidSyntaxError(
      `<${type}> cannot have two heritage clauses which are both "extends" or both "implements". It can one of each, only one, or neither`
    );
  }

  const ext_node =
    heritage_a &&
    (!heritage_a.props.kind || heritage_a.props.kind === "extends")
      ? heritage_a
      : heritage_b &&
        (!heritage_b.props.kind || heritage_b.props.kind === "extends")
      ? heritage_b
      : null;

  const imp_node =
    heritage_a && heritage_a.props.kind === "implements"
      ? heritage_a
      : heritage_b && heritage_b.props.kind === "implements"
      ? heritage_b
      : null;

  const properties = walker.spliceAssertGroup([
    "field",
    "method",
    "get-accessor",
    "set-accessor",
  ]);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      ["field", "method", "get-accessor", "set-accessor"],
      walker.remainingChildTypes
    );
  }

  return {
    type,
    props,
    render: () =>
      `${exported ? "export " : ""}class ${ident.render()}${
        type_parameters.length > 0
          ? `<${type_parameters.map((a) => a.render()).join(",")}>`
          : ""
      }${ext_node ? ` ${ext_node.render()}` : ""}${
        imp_node ? ` ${imp_node.render()}` : ""
      }{${properties.map((a) => a.render()).join(";")}}`,
  };
}
