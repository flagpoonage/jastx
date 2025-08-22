import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("ifs", () => {
  const x = `if (x === 10) { console.log(a); }`;
  expect(stringToJastx(x).render()).toBe(`if(x){console.log(a)}`);
});
