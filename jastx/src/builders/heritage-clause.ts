import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import { AstNode } from "../types.js";

const ident_type = "heritage-ident";

export interface HeritageIdentifierProps {
  children: any;
  type?: string;
}

// This is called an ExpressionWithTypeArguments node in TS, which is dumb
export interface HeritageIdentifierNode extends AstNode {
  type: typeof ident_type;
  props: HeritageIdentifierProps;
}

export function createHeritageIdentifier(
  props: HeritageIdentifierProps
): HeritageIdentifierNode {
  const walker = createChildWalker(ident_type, props);

  const ident = walker.spliceAssertNext("ident");
  const types = walker.spliceAssertGroup("t:param");

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      ident_type,
      ["ident", "t:param"],
      walker.remainingChildTypes
    );
  }

  return {
    type: ident_type,
    props,
    render: () =>
      `${ident.render()}${
        types.length > 0 ? `<${types.map((a) => a.render()).join(",")}>` : ""
      }`,
  };
}

const type = "heritage-clause";

export interface HeritageClauseProps {
  children: any;
  type?: string;
}

export interface HeritageClauseNode extends AstNode {
  type: typeof type;
  props: HeritageClauseProps;
}

export function createHeritageClause(
  props: HeritageClauseProps
): HeritageClauseNode {
  const walker = createChildWalker(type, props);

  const idents = walker.spliceAssertGroup(["ident", "heritage-ident"]);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      ["ident", "heritage-ident"],
      walker.remainingChildTypes
    );
  }

  return {
    type,
    props,
    render: () => {
      return `extends ${idents.map((a) => a.render()).join(",")}`;
    },
  };
}
