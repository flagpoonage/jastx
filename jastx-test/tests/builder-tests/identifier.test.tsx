import { expect, test } from "vitest";

test("ident works correctly", () => {
  const v = <ident name="James" />;
  expect(v.render()).toBe("James");
});

test("ident throws with children", () => {
  expect(() => (
    // @ts-expect-error
    <ident name="James">
      <ident name="James" />
    </ident>
  )).toThrowError("<ident> expected [0] children but received [1]");
});
