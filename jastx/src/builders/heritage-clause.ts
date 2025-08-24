import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import type { AstNode } from "../types.js";

const type = "heritage-clause";

export interface HeritageClauseProps {
  children: any;
  kind?: "implements" | "extends";
}

export interface HeritageClauseNode extends AstNode {
  type: typeof type;
  props: HeritageClauseProps;
}

export function createHeritageClause(
  props: HeritageClauseProps
): HeritageClauseNode {
  const walker = createChildWalker(type, props);

  // TODO: Support more than just static types
  const idents = walker.spliceAssertGroup(["ident", "t:ref"]);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      ["ident", "t:ref"],
      walker.remainingChildTypes
    );
  }

  return {
    type,
    props,
    render: () => {
      return `${props.kind === "implements" ? "implements" : "extends"} ${idents
        .map((a) => a.render())
        .join(",")}`;
    },
  };
}
