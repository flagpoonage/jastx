import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("functions", () => {
  const x = `function test<T, K extends string = 'asd'>(v: T, x?: T, ...rest: T[]): K { return v as K }`;
  expect(stringToJastx(x).render()).toBe(
    `function test<T,K extends string="asd">(v:T,x?:T,...rest:T[]):K{return v as K;}`
  );
});
test("async functions", () => {
  const x = `async function test<T, K extends string = 'asd'>(v: T, x?: T, ...rest: T[]): K { return v as K }`;
  expect(stringToJastx(x).render()).toBe(
    `async function test<T,K extends string="asd">(v:T,x?:T,...rest:T[]):K{return v as K;}`
  );
});

// TODO: Declarations are a whole kettle of fish that I've not handled properly yet.
test.skip("declared functions", () => {
  const x = `declare function test<T, K extends string = 'asd'>(v: T, x?: T, ...rest: T[]): K;`;
  expect(stringToJastx(x).render()).toBe(
    `async function test<T,K extends string="asd">(v:T,x?:T,...rest:T[]):K{return v as K;}`
  );
});

test("functions exported", () => {
  const x = `export function test<T, K extends string = 'asd'>(v: T, x?: T, ...rest: T[]): K { return v as K }`;
  expect(stringToJastx(x).render()).toBe(
    `export function test<T,K extends string="asd">(v:T,x?:T,...rest:T[]):K{return v as K;}`
  );
});

test("arrow-functions", () => {
  const x = `const test = <T, K extends string = 'asd'>(v: T, x?: T, ...rest: T[]): K => { return v as K }`;
  expect(stringToJastx(x).render()).toBe(
    `const test=<T,K extends string="asd">(v:T,x?:T,...rest:T[]):K=>{return v as K;}`
  );
});
