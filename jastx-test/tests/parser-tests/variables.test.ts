import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("lexical_declaration", () => {
  const x = `const a: string = '10', x = 10n, y: Q<S,T>`;
  expect(stringToJastx(x).render()).toBe(`const a:string="10",x=10n,y:Q<S,T>`);
});

test("lexical_declaration with export", () => {
  const x = `export let a: string = "test", b: number = 10;`;
  expect(stringToJastx(x).render()).toBe(
    `export let a:string="test",b:number=10`
  );
});
