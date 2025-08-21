import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("ifs", () => {
  const x = `if (x) { console.log(a); }`;
  expect(stringToJastx(x).render()).toBe(`if(x){console.log(a)}`);
});
