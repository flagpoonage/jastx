import { expect, test } from "vitest";

test("<exact-literal> works correctly", () => {
  const v = <exact-literal value="James" />;
  expect(v.render()).toBe("James");
});

test("<exact-literal> throws with children", () => {
  expect(() => (
    // @ts-expect-error
    <exact-literal value="James">
      <exact-literal value="James" />
    </exact-literal>
  )).toThrowError("<exact-literal> expected [0] children but received [1]");
});
