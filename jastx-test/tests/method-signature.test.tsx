import { expect, test } from "vitest";

test("t:method renders correctly with no parameters", () => {
  const v = (
    <t:method>
      <ident name="x" />
      <t:primitive type="string" />
    </t:method>
  );

  expect(v.render()).toBe("x():string");
});

test("t:method renders correctly with a method parameters", () => {
  const v1 = (
    <t:method>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:method>
  );
  const v2 = (
    <t:method>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <param>
        <ident name="b" />
        <t:primitive type="string" />
      </param>
      <t:primitive type="string" />
    </t:method>
  );
  const v3 = (
    <t:method>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <param modifier="rest">
        <ident name="b" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:method>
  );
  const v4 = (
    <t:method>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <param modifier="optional">
        <ident name="b" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:method>
  );
  const v5 = (
    <t:method>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:method>
  );

  expect(v1.render()).toBe("x(a:number):string");
  expect(v2.render()).toBe("x(a:number,b:string):string");
  expect(v3.render()).toBe("x(a:number,...b:number):string");
  expect(v4.render()).toBe("x(a:number,b?:number):string");
});

test("t:method renders correctly with type parameters", () => {
  const v1 = (
    <t:method>
      <ident name="x" />
      <t:param>
        <ident name="T" />
      </t:param>
      <param>
        <ident name="a" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <t:primitive type="string" />
    </t:method>
  );
  const v2 = (
    <t:method>
      <ident name="x" />
      <t:param>
        <ident name="T" />
      </t:param>
      <t:param>
        <ident name="B" />
        <t:primitive type="string" />
      </t:param>
      <param>
        <ident name="a" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <param>
        <ident name="b" />
        <t:ref>
          <ident name="B" />
        </t:ref>
      </param>
      <t:primitive type="string" />
    </t:method>
  );

  expect(v1.render()).toBe("x<T>(a:T):string");
  expect(v2.render()).toBe("x<T,B extends string>(a:T,b:B):string");
});

test("t:method renders correctly with optional setting", () => {
  const v1 = (
    <t:method optional={true}>
      <ident name="x" />
      <t:param>
        <ident name="T" />
      </t:param>
      <param>
        <ident name="a" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <t:primitive type="string" />
    </t:method>
  );
  const v2 = (
    <t:method optional={true}>
      <ident name="x" />
      <t:param>
        <ident name="T" />
      </t:param>
      <t:param>
        <ident name="B" />
        <t:primitive type="string" />
      </t:param>
      <param>
        <ident name="a" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <param>
        <ident name="b" />
        <t:ref>
          <ident name="B" />
        </t:ref>
      </param>
      <t:primitive type="string" />
    </t:method>
  );

  expect(v1.render()).toBe("x?<T>(a:T):string");
  expect(v2.render()).toBe("x?<T,B extends string>(a:T,b:B):string");
});

test("t:property renders correctly with no parameters", () => {
  const v = (
    <t:property>
      <ident name="x" />
      <t:primitive type="string" />
    </t:property>
  );

  expect(v.render()).toBe("x():string");
});

test("t:property renders correctly with a property parameters", () => {
  const v1 = (
    <t:property>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:property>
  );
  const v2 = (
    <t:property>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <param>
        <ident name="b" />
        <t:primitive type="string" />
      </param>
      <t:primitive type="string" />
    </t:property>
  );
  const v3 = (
    <t:property>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <param modifier="rest">
        <ident name="b" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:property>
  );
  const v4 = (
    <t:property>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <param modifier="optional">
        <ident name="b" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:property>
  );
  const v5 = (
    <t:property>
      <ident name="x" />
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:property>
  );

  expect(v1.render()).toBe("x(a:number):string");
  expect(v2.render()).toBe("x(a:number,b:string):string");
  expect(v3.render()).toBe("x(a:number,...b:number):string");
  expect(v4.render()).toBe("x(a:number,b?:number):string");
});

test("t:method renders correctly with type parameters", () => {
  const v1 = (
    <t:method>
      <ident name="x" />
      <t:param>
        <ident name="T" />
      </t:param>
      <param>
        <ident name="a" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <t:primitive type="string" />
    </t:method>
  );
  const v2 = (
    <t:method>
      <ident name="x" />
      <t:param>
        <ident name="T" />
      </t:param>
      <t:param>
        <ident name="B" />
        <t:primitive type="string" />
      </t:param>
      <param>
        <ident name="a" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <param>
        <ident name="b" />
        <t:ref>
          <ident name="B" />
        </t:ref>
      </param>
      <t:primitive type="string" />
    </t:method>
  );

  expect(v1.render()).toBe("x<T>(a:T):string");
  expect(v2.render()).toBe("x<T,B extends string>(a:T,b:B):string");
});

test("t:method renders correctly with optional setting", () => {
  const v1 = (
    <t:method optional={true}>
      <ident name="x" />
      <t:param>
        <ident name="T" />
      </t:param>
      <param>
        <ident name="a" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <t:primitive type="string" />
    </t:method>
  );
  const v2 = (
    <t:method optional={true}>
      <ident name="x" />
      <t:param>
        <ident name="T" />
      </t:param>
      <t:param>
        <ident name="B" />
        <t:primitive type="string" />
      </t:param>
      <param>
        <ident name="a" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </param>
      <param>
        <ident name="b" />
        <t:ref>
          <ident name="B" />
        </t:ref>
      </param>
      <t:primitive type="string" />
    </t:method>
  );

  expect(v1.render()).toBe("x?<T>(a:T):string");
  expect(v2.render()).toBe("x?<T,B extends string>(a:T,b:B):string");
});
