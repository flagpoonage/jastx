import { expect, test } from "vitest";

test("var:declaration renders correctly with just a name", () => {
  const v = (
    <var:declaration>
      <p:var-name>
        <ident name="test" />
      </p:var-name>
    </var:declaration>
  );
  expect(v.render()).toBe("test");
});

test("var:declaration throws with no children", () => {
  expect(() => (
    // @ts-expect-error
    <var:declaration name="James" />
  )).toThrowError();
});

test("var:declaration renders correctly with type", () => {
  const v = (
    <var:declaration>
      <p:var-name>
        <ident name="test" />
      </p:var-name>
      <p:type>
        <t:primitive type="string" />
      </p:type>
    </var:declaration>
  );
  expect(v.render()).toBe("test:string");
});

test("var:declaration renders correctly with type and initializer", () => {
  const v = (
    <var:declaration>
      <p:var-name>
        <ident name="test" />
      </p:var-name>
      <p:type>
        <t:primitive type="string" />
      </p:type>
      <l:string value="Hello" />
    </var:declaration>
  );
  expect(v.render()).toBe('test:string="Hello"');
});

test("var:declaration renders correctly with identifier attribute", () => {
  const v = (
    <var:declaration identifier="test">
      <p:type>
        <t:primitive type="string" />
      </p:type>
      <l:string value="Hello" />
    </var:declaration>
  );
  expect(v.render()).toBe('test:string="Hello"');
});

test("var:declaration renders correctly with type attribute", () => {
  const v = (
    <var:declaration type="string">
      <p:var-name>
        <ident name="test" />
      </p:var-name>
      <l:string value="Hello" />
    </var:declaration>
  );
  expect(v.render()).toBe('test:string="Hello"');
});

test("var:declaration renders correctly with all attributes", () => {
  const v = (
    <var:declaration type="string" identifier="test">
      <l:string value="Hello" />
    </var:declaration>
  );
  expect(v.render()).toBe('test:string="Hello"');
});

test("var:declaration errors when idents are specified in attributes and children", () => {
  expect(() => (
    <var:declaration type="string" identifier="test">
      <p:var-name>
        <ident name="test" />
      </p:var-name>
    </var:declaration>
  )).toThrowError();
});

test("var:declaration errors when types are specified in attributes and children", () => {
  expect(() => (
    <var:declaration type="string" identifier="test">
      <p:type>
        <t:primitive type="string" />
      </p:type>
      <l:string value="Hello" />
    </var:declaration>
  )).toThrowError();
});
