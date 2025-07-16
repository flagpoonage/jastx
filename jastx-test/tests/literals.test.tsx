import { expect, test } from "vitest";

test("<l:bigint> renders correctly", () => {
  expect((<l:bigint value={20} />).render()).toBe("20n");
});

test("<l:bigint> throws an error when a non-integer is used", () => {
  expect(() => (<l:bigint value={20.4} />).render()).toThrowError();
});

test("<l:bigint> renders exponents directly", () => {
  expect((<l:bigint value={20e3} />).render()).toBe("20000n");
});