import { expect, test } from "vitest";

test("identifier works correctly", () => {
  const v = <identifier name="James" />;
  expect(v.render()).toBe("James");
});

test("identifier throws with children", () => {
  expect(() => (
    // @ts-expect-error
    <identifier name="James">
      <identifier name="James" />
    </identifier>
  )).toThrowError("<identifier> expected [0] children but received [1]");
});
