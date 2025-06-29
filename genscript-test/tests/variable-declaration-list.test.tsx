import { expect, test } from "vitest";

test("variable-declaration renders correctly with just a name", () => {
  const v = (
    <varia
    <variable-declaration>
      <p:var-name>
        <identifier name="test" />
      </p:var-name>
    </variable-declaration>
  );
  expect(v.render()).toBe("test");
});

test("variable-declaration throws with no children", () => {
  expect(() => (
    // @ts-expect-error
    <variable-declaration name="James" />
  )).toThrowError();
});

test("variable-declaration renders correctly with type", () => {
  const v = (
    <variable-declaration>
      <p:var-name>
        <identifier name="test" />
      </p:var-name>
      <p:type>
        <exact-literal value="string" />
      </p:type>
    </variable-declaration>
  );
  expect(v.render()).toBe("test:string");
});

test("variable-declaration renders correctly with type and initializer", () => {
  const v = (
    <variable-declaration>
      <p:var-name>
        <identifier name="test" />
      </p:var-name>
      <p:type>
        <exact-literal value="string" />
      </p:type>
      <p:initializer>
        <exact-literal value={`"Hello"`} />
      </p:initializer>
    </variable-declaration>
  );
  expect(v.render()).toBe('test:string="Hello"');
});
