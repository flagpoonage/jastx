import { expect, test } from "vitest";

test("var:declaration renders correctly with just a name", () => {
  const v = (
    <var:declaration>
      <ident name="test" />
    </var:declaration>
  );
  expect(v.render()).toBe("test");
});

test("var:declaration throws with no children", () => {
  expect(() => (
    <var:declaration />
  )).toThrowError();
});

test("var:declaration renders correctly with type", () => {
  const v = (
    <var:declaration>
      <ident name="test" />
      <t:primitive type="string" />
    </var:declaration>
  );
  expect(v.render()).toBe("test:string");
});

// test("var:declaration renders correctly with all fields", () => {
//   const v = (
//     <var:declaration>
//       <ident name="test" />
//       <t:primitive type="string" />
//       <l:string value="Hello" />
//     </var:declaration>
//   );
//   expect(v.render()).toBe('test:string="Hello"');
// });
