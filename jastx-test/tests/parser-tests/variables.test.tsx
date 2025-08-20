import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("lexical_declaration", () => {
  const x = `const a = 10, x = 10`;
  expect(stringToJastx(x).render()).toBe("const a = 10");
});
