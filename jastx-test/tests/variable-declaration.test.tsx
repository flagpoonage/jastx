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
  expect(() => <var:declaration />).toThrowError();
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

test("var:declaration renders correctly with array binding", () => {
  const v = (
    <var:declaration>
      <bind:array>
        <ident name="a" />
        <bind:array-elem>
          <ident name="b" />
          <l:number value={10} />
        </bind:array-elem>
      </bind:array>
      <t:primitive type="string" />
    </var:declaration>
  );
  expect(v.render()).toBe("[a,b=10]:string");
});
