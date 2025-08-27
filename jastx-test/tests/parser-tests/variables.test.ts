import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("lexical_declaration", () => {
  const x = `const a: string = '10', x = 10n, y: Q<S,T>`;
  expect(stringToJastx(x).render()).toBe(`const a:string="10",x=10n,y:Q<S,T>`);
});

test("array bindings", () => {
  const x = `const [a,b]: [string, number] = ['10',10], x = 10n, y: Q<S,T>`;
  expect(stringToJastx(x).render()).toBe(
    `const [a,b]:[string,number]=["10",10],x=10n,y:Q<S,T>`
  );
});

test("lexical_declaration with export", () => {
  const x = `export let a: string = "test", b: number = 10;`;
  expect(stringToJastx(x).render()).toBe(
    `export let a:string="test",b:number=10`
  );
});

test("lexical_declaration with function", () => {
  const x = `const a: string = '10', x = function () { console.log('Go'); }, y: Q<S,T>`;
  expect(stringToJastx(x).render()).toBe(
    `const a:string="10",x=function (){console.log("Go");},y:Q<S,T>`
  );
});

test("objects with get/set", () => {
  const x = `const x = { get a () { return '10'; }, set b (v: string) { this._b = v }}`;
  expect(stringToJastx(x).render()).toBe(
    `const x={get a(){return "10";},set b(v:string){this._b=v;}}`
  );
});
