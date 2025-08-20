import { stringToJastx } from "jastx-parse";
import { expect, test } from "vitest";

test("namespace_import", () => {
  const x = `import * as P from 'types'`;
  expect(stringToJastx(x).render()).toBe(`import * as P from "types"`);
  const y = `import type * as P from 'types'`;
  expect(stringToJastx(y).render()).toBe(`import type * as P from "types"`);
});

test("named_imports", () => {
  const x = `import { X } from 'types'`;
  expect(stringToJastx(x).render()).toBe(`import {X} from "types"`);
  const y = `import type { X } from 'types'`;
  expect(stringToJastx(y).render()).toBe(`import type {X} from "types"`);
});

test("named_imports with types", () => {
  const x = `import { type X, B } from 'types'`;
  expect(stringToJastx(x).render()).toBe(`import {type X,B} from "types"`);
});

test("defailt import", () => {
  const x = `import X from 'types'`;
  expect(stringToJastx(x).render()).toBe(`import X from "types"`);
  const y = `import type X from 'types'`;
  expect(stringToJastx(y).render()).toBe(`import type X from "types"`);
});

test("mixed import", () => {
  const x = `import X, { type B } from 'types'`;
  expect(stringToJastx(x).render()).toBe(`import X,{type B} from "types"`);
});

test("direct import", () => {
  const x = `import 'types'`;
  expect(stringToJastx(x).render()).toBe(`import "types"`);
});
