import Parser, { Language } from "tree-sitter";
import ts from "tree-sitter-typescript";

const x = new Parser();
x.setLanguage(ts.typescript as Language);

export function stringToJastx(v: string) {
  const parser = x.parse(v);
  const walker = parser.walk();
}

const pg = `
import './test';
import * as T from './test';
import T from './test';
import { T, type X as Common } from './test';
import T, { B, D } from './test';
import { F as QWW} from './test';
import type T from './test';
import type { T } from './test';
import type * as T from './test';
import T, { type X } from './test';
`;
import Parser from "tree-sitter";
import ts from "tree-sitter-typescript";

const x = new Parser();
x.setLanguage(ts.typescript);

const pg = `
import './test';
import * as T from './test';
import T from './test';
import { T, type X as Common } from './test';
import T, { B, D } from './test';
import { F as QWW} from './test';
import type T from './test';
import type { T } from './test';
import type * as T from './test';
import T, { type X } from './test';
`;

const output = x.parse(pg);
const walker = output.rootNode.walk();

walker.gotoFirstChild();

function collectImports() {
  const imports = [];
  do {
    const t = walker.currentNode.type;
    if (t === "import_statement") {
      imports.push(parseImportStatement(walker.currentNode));
    }
  } while (walker.gotoNextSibling());

  return imports;
}

/**
 *
 * @param {Parser.SyntaxNode} node
 */
function parseImportStatement(node) {
  const is_full_type_import = !!node.children.find(
    (a) => a instanceof Parser.SyntaxNode && a.type === "type"
  );

  const source = node.children
    .find((a) => a.type === "string")
    .text.replaceAll("\"'", "");

  const type_imports = {
    default: null,
    ["*"]: null,
  };

  const value_imports = {
    default: null,
    ["*"]: null,
  };

  const import_clause = node.children.find((a) => a.type === "import_clause");

  if (!import_clause) {
    return node;
  }

  console.log(import_clause.children);

  if (is_full_type_import) {
    type_imports["*"] = readNamespaceImportId(import_clause);
    type_imports.default = readDefaultImportId(import_clause);
  } else {
    value_imports["*"] = readNamespaceImportId(import_clause);
    value_imports.default = readDefaultImportId(import_clause);
  }

  const named_imports = import_clause.children.find(
    (a) => a.type === "named_imports"
  );

  if (named_imports) {
    const specifiers = named_imports.children.filter(
      (a) => a.type === "import_specifier"
    );

    for (const specifier of specifiers) {
      if (specifier.children.length > 1) {
        console.log("SPEC CHILD", specifier.children);
      }
      const id = specifier.children.filter((a) => a.type === "identifier");

      if (id.length === 0) {
        throw new Error("Expected identifier for named import specifier");
      }

      const as_type = specifier.children.find(
        (a) => a instanceof Parser.SyntaxNode && a.type === "type"
      );

      const identifier = id[0].text;

      const alias = id.length > 1 ? id[1].text : identifier;

      if (as_type) {
        type_imports[identifier] = alias;
      } else {
        value_imports[identifier] = alias;
      }
    }
    console.log(
      "NI",
      specifiers.map((a) => a.children)
    );
  }

  return {
    source: source.replaceAll(/'|"/g, ""),
    types: type_imports,
    values: value_imports,
  };
}

/**
 *
 * @param {Parser.SyntaxNode} node
 */
function readNamespaceImportId(import_clause) {
  const ns_import = import_clause.children.find(
    (a) => a.type === "namespace_import"
  );

  if (!ns_import) {
    return null;
  }

  const ns_id = ns_import.children.find((a) => a.type === "identifier");

  if (!ns_id) {
    throw new Error("Expected identifier for namespace import");
  }

  return ns_id.text;
}

/**
 *
 * @param {Parser.SyntaxNode} node
 */
function readDefaultImportId(import_clause) {
  const def_import = import_clause.children.find(
    (a) => a.type === "identifier"
  );

  if (!def_import) {
    return null;
  }

  return def_import.text;
}

console.log(collectImports());

walker.gotoFirstChild();

function collectImports() {
  const imports = [];
  do {
    const t = walker.currentNode.type;
    if (t === "import_statement") {
      imports.push(parseImportStatement(walker.currentNode));
    }
  } while (walker.gotoNextSibling());

  return imports;
}

/**
 *
 * @param {Parser.SyntaxNode} node
 */
function parseImportStatement(node) {
  const is_full_type_import = !!node.children.find(
    (a) => a instanceof Parser.SyntaxNode && a.type === "type"
  );

  const source = node.children
    .find((a) => a.type === "string")
    .text.replaceAll("\"'", "");

  const type_imports = {
    default: null,
    ["*"]: null,
  };

  const value_imports = {
    default: null,
    ["*"]: null,
  };

  const import_clause = node.children.find((a) => a.type === "import_clause");

  if (!import_clause) {
    return node;
  }

  console.log(import_clause.children);

  if (is_full_type_import) {
    type_imports["*"] = readNamespaceImportId(import_clause);
    type_imports.default = readDefaultImportId(import_clause);
  } else {
    value_imports["*"] = readNamespaceImportId(import_clause);
    value_imports.default = readDefaultImportId(import_clause);
  }

  const named_imports = import_clause.children.find(
    (a) => a.type === "named_imports"
  );

  if (named_imports) {
    const specifiers = named_imports.children.filter(
      (a) => a.type === "import_specifier"
    );

    for (const specifier of specifiers) {
      if (specifier.children.length > 1) {
        console.log("SPEC CHILD", specifier.children);
      }
      const id = specifier.children.filter((a) => a.type === "identifier");

      if (id.length === 0) {
        throw new Error("Expected identifier for named import specifier");
      }

      const as_type = specifier.children.find(
        (a) => a instanceof Parser.SyntaxNode && a.type === "type"
      );

      const identifier = id[0].text;

      const alias = id.length > 1 ? id[1].text : identifier;

      if (as_type) {
        type_imports[identifier] = alias;
      } else {
        value_imports[identifier] = alias;
      }
    }
    console.log(
      "NI",
      specifiers.map((a) => a.children)
    );
  }

  return {
    source: source.replaceAll(/'|"/g, ""),
    types: type_imports,
    values: value_imports,
  };
}

/**
 *
 * @param {Parser.SyntaxNode} node
 */
function readNamespaceImportId(import_clause) {
  const ns_import = import_clause.children.find(
    (a) => a.type === "namespace_import"
  );

  if (!ns_import) {
    return null;
  }

  const ns_id = ns_import.children.find((a) => a.type === "identifier");

  if (!ns_id) {
    throw new Error("Expected identifier for namespace import");
  }

  return ns_id.text;
}

/**
 *
 * @param {Parser.SyntaxNode} node
 */
function readDefaultImportId(import_clause) {
  const def_import = import_clause.children.find(
    (a) => a.type === "identifier"
  );

  if (!def_import) {
    return null;
  }

  return def_import.text;
}

console.log(collectImports());
