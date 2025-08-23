import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("functions", () => {
  const x = `function test<T, K extends string = 'asd'>(v: T, x?: T, ...rest: T[]): K { return v as K }`;
  expect(stringToJastx(x).render()).toBe(
    `function test<T,K extends string="asd">(v:T,x?:T,...rest:T[]):K{return v as K;}`
  );
});

test("functions exported", () => {
  const x = `export function test<T, K extends string = 'asd'>(v: T, x?: T, ...rest: T[]): K { return v as K }`;
  expect(stringToJastx(x).render()).toBe(
    `export function test<T,K extends string="asd">(v:T,x?:T,...rest:T[]):K{return v as K;}`
  );
});
