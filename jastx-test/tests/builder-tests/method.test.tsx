import { expect, test } from "vitest";

test("method renders correctly", () => {
  const v1 = (
    <method>
      <ident name="test" />
      <block />
    </method>
  );

  expect(v1.render()).toBe("test(){}");
});

test("method renders correctly", () => {
  const v2 = (
    <method async>
      <ident name="test" />
      <block />
    </method>
  );

  expect(v2.render()).toBe("async test(){}");
});

test("method renders with parameters", () => {
  const v1 = (
    <method>
      <ident name="test" />
      <param>
        <ident name="a" />
      </param>
      <param>
        <ident name="b" />
        <t:primitive type="string" />
      </param>
      <param>
        <ident name="c" />
        <t:primitive type="string" />
        <l:string value="hello" />
      </param>
      <block />
    </method>
  );

  expect(v1.render()).toBe('test(a,b:string,c:string="hello"){}');
});

test("method renders with type parameters", () => {
  const v1 = (
    <method>
      <ident name="test" />
      <t:param>
        <ident name="A" />
      </t:param>
      <t:param>
        <ident name="B" />
      </t:param>
      <t:param>
        <ident name="C" />
      </t:param>
      <param>
        <ident name="a" />
      </param>
      <param>
        <ident name="b" />
        <t:ref>
          <ident name="B" />
        </t:ref>
      </param>
      <param>
        <ident name="c" />
        <t:ref>
          <ident name="C" />
        </t:ref>
        <l:string value="hello" />
      </param>
      <block />
    </method>
  );

  expect(v1.render()).toBe('test<A,B,C>(a,b:B,c:C="hello"){}');
});

test("method renders with type predicate", () => {
  const v1 = (
    <method>
      <ident name="test" />
      <t:param>
        <ident name="A" />
      </t:param>
      <t:param>
        <ident name="B" />
      </t:param>
      <t:param>
        <ident name="C" />
      </t:param>
      <param>
        <ident name="a" />
      </param>
      <param>
        <ident name="b" />
        <t:ref>
          <ident name="B" />
        </t:ref>
      </param>
      <param>
        <ident name="c" />
        <t:ref>
          <ident name="C" />
        </t:ref>
        <l:string value="hello" />
      </param>
      <t:predicate>
        <ident name="b" />
        <t:primitive type="string" />
      </t:predicate>
      <block />
    </method>
  );

  expect(v1.render()).toBe(
    'test<A,B,C>(a,b:B,c:C="hello"):b is string{}'
  );
});

test("method renders with generator token", () => {
  const v1 = (
    <method generator={true}>
      <ident name="test" />
      <block />
    </method>
  );

  expect(v1.render()).toBe("*test(){}");
});

test("method throws an error if no body is spoecified", () => {
  expect(() => (
    <method>
      <ident name="test" />
    </method>
  )).toThrow();
});

test("method throws an error if no other nodes are specifeid", () => {
  expect(() => (
    <method generator={true}>
      <ident name="test" />
      <ident name="test2" />
    </method>
  )).toThrow();
});
