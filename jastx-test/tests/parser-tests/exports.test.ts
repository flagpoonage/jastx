import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("named export statement", () => {
  const x = `export { A, B }`;
  expect(stringToJastx(x).render()).toBe("export {A,B}");
  const y = `export type { A, B }`;
  expect(stringToJastx(y).render()).toBe("export type {A,B}");
});

test("export statement with source", () => {
  const x = `export { A, B } from 'test'`;
  expect(stringToJastx(x).render()).toBe('export {A,B} from "test"');
  const y = `export type { A, B } from 'test'`;
  expect(stringToJastx(y).render()).toBe('export type {A,B} from "test"');
});

test("default export", () => {
  const x = `export default A`;
  expect(stringToJastx(x).render()).toBe("export default A");
});
