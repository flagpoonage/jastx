import { expect, test } from "vitest";

test("t:function renders correctly with implicit return", () => {
  const v1 = (
    <t:function>
      <l:number value={20} />
    </t:function>
  );

  expect(v1.render()).toBe(`()=>20`);
  const v2 = (
    <t:function>
      <t:function>
        <l:number value={20} />
      </t:function>
    </t:function>
  );

  expect(v2.render()).toBe(`()=>()=>20`);
});

test("t:function renders correctly with single typed parameter", () => {
  const v1 = (
    <t:function>
      <param>
        <ident name="x" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:function>
  );

  expect(v1.render()).toBe(`(x:number)=>string`);
});

test("t:function renders correctly with multiple parameters", () => {
  const v1 = (
    <t:function>
      <param>
        <ident name="x" />
        <t:primitive type="number" />
      </param>
      <param>
        <ident name="y" />
      </param>
      <t:primitive type="string" />
    </t:function>
  );

  expect(v1.render()).toBe(`(x:number,y)=>string`);
});

test("t:function renders correctly with type parameters", () => {
  const v1 = (
    <t:function>
      <t:param>
        <ident name="T" />
      </t:param>
      <t:param>
        <ident name="Y" />
        <t:primitive type="number" />
      </t:param>
      <param>
        <ident name="x" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <t:primitive type="string" />
    </t:function>
  );

  expect(v1.render()).toBe(`<T,Y extends number>(x:T)=>string`);
});

test("t:function renders correctly with return type predicate", () => {
  const v1 = (
    <t:function>
      <t:param>
        <ident name="T" />
      </t:param>
      <t:param>
        <ident name="Y" />
        <t:primitive type="number" />
      </t:param>
      <param>
        <ident name="x" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <t:predicate>
        <ident name="x" />
        <t:primitive type="string" />
      </t:predicate>
    </t:function>
  );

  expect(v1.render()).toBe(`<T,Y extends number>(x:T)=>x is string`);
});

test("t:function renders correctly with return type asserts predicate", () => {
  const v1 = (
    <t:function>
      <t:param>
        <ident name="T" />
      </t:param>
      <t:param>
        <ident name="Y" />
        <t:primitive type="number" />
      </t:param>
      <param>
        <ident name="x" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <t:predicate asserts={true}>
        <ident name="x" />
        <t:primitive type="string" />
      </t:predicate>
    </t:function>
  );

  expect(v1.render()).toBe(`<T,Y extends number>(x:T)=>asserts x is string`);
});
