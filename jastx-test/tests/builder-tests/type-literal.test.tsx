import { expect, test } from "vitest";

test("t:literal renders an empty object", () => {
  const v = <t:literal />;

  expect(v.render()).toBe("{}");
});

test("t:literal renders simple properties", () => {
  const v = (
    <t:literal>
      <t:property>
        <ident name="x" />
        <t:primitive type="string" />
      </t:property>
      <t:property computed>
        <ident name="aString" />
        <t:primitive type="number" />
      </t:property>
    </t:literal>
  );

  expect(v.render()).toBe("{x:string;[aString]:number;}");
});

test("t:literal renders with construct signatures", () => {
  const v = (
    <t:literal>
      <t:construct>
        <t:primitive type="number" />
      </t:construct>
      <t:property>
        <ident name="x" />
        <t:primitive type="string" />
      </t:property>
    </t:literal>
  );

  expect(v.render()).toBe("{new():number;x:string;}");
});

test("t:literal renders with index signatures", () => {
  const v = (
    <t:literal>
      <t:index>
        <ident name="k" />
        <t:primitive type="number" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </t:index>
      <t:property>
        <ident name="x" />
        <t:primitive type="string" />
      </t:property>
    </t:literal>
  );

  expect(v.render()).toBe("{[k:number]:T;x:string;}");
});

test("t:literal renders with method signatures", () => {
  const v = (
    <t:literal>
      <t:method>
        <ident name="x" />
        <t:param>
          <ident name="T" />
        </t:param>
        <param>
          <ident name="y" />
          <t:ref>
            <ident name="T" />
          </t:ref>
        </param>
        <t:primitive type="unknown" />
      </t:method>
      <t:property>
        <ident name="y" />
        <t:primitive type="string" />
      </t:property>
    </t:literal>
  );

  expect(v.render()).toBe("{x<T>(y:T):unknown;y:string;}");
});
