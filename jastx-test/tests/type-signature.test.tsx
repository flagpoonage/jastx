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

test("t:property renders correctly with identifiers", () => {
  const v1 = (
    <t:property>
      <ident name="x" />
      <t:primitive type="string" />
    </t:property>
  );

  expect(v1.render()).toBe("x:string");
});

test("t:property renders computed identifiers in square brackets", () => {
  const v1 = (
    <t:property computed>
      <ident name="x" />
      <t:primitive type="string" />
    </t:property>
  );

  expect(v1.render()).toBe("[x]:string");
});

test("t:property renders in square brackets with number keys", () => {
  const v1 = (
    <t:property>
      <l:number value={2} />
      <t:primitive type="string" />
    </t:property>
  );

  expect(v1.render()).toBe("[2]:string");
});

test("t:property renders in square brackets with string keys", () => {
  const v1 = (
    <t:property>
      <l:string value="x" />
      <t:primitive type="string" />
    </t:property>
  );

  expect(v1.render()).toBe('["x"]:string');
});

test("t:property renders correctly with optional keys", () => {
  const v1 = (
    <t:property optional>
      <ident name="x" />
      <t:primitive type="string" />
    </t:property>
  );

  const v2 = (
    <t:property optional>
      <l:number value={2} />
      <t:primitive type="string" />
    </t:property>
  );

  const v3 = (
    <t:property optional>
      <l:string value="x" />
      <t:primitive type="string" />
    </t:property>
  );

  expect(v1.render()).toBe("x?:string");
  expect(v2.render()).toBe("[2]?:string");
  expect(v3.render()).toBe('["x"]?:string');
});

test("t:construct renders correctly with no parameters", () => {
  const v = (
    <t:construct>
      <t:primitive type="string" />
    </t:construct>
  );

  expect(v.render()).toBe("new():string");
});

test("t:construct renders correctly with a construct parameters", () => {
  const v1 = (
    <t:construct>
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:construct>
  );
  const v2 = (
    <t:construct>
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <param>
        <ident name="b" />
        <t:primitive type="string" />
      </param>
      <t:primitive type="string" />
    </t:construct>
  );
  const v3 = (
    <t:construct>
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <param modifier="rest">
        <ident name="b" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:construct>
  );
  const v4 = (
    <t:construct>
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <param modifier="optional">
        <ident name="b" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:construct>
  );
  const v5 = (
    <t:construct>
      <param>
        <ident name="a" />
        <t:primitive type="number" />
      </param>
      <t:primitive type="string" />
    </t:construct>
  );

  expect(v1.render()).toBe("new(a:number):string");
  expect(v2.render()).toBe("new(a:number,b:string):string");
  expect(v3.render()).toBe("new(a:number,...b:number):string");
  expect(v4.render()).toBe("new(a:number,b?:number):string");
});

test("t:construct renders correctly with type parameters", () => {
  const v1 = (
    <t:construct>
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
    </t:construct>
  );
  const v2 = (
    <t:construct>
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
    </t:construct>
  );

  expect(v1.render()).toBe("new<T>(a:T):string");
  expect(v2.render()).toBe("new<T,B extends string>(a:T,b:B):string");
});

test("t:index renders correctly with string,number,symbol index types", () => {
  const v1 = (
    <t:index>
      <ident name="k" />
      <t:primitive type="string" />
      <t:primitive type="unknown" />
    </t:index>
  );

  const v2 = (
    <t:index>
      <ident name="k" />
      <t:primitive type="number" />
      <t:primitive type="unknown" />
    </t:index>
  );

  const v3 = (
    <t:index>
      <ident name="k" />
      <t:primitive type="symbol" />
      <t:primitive type="unknown" />
    </t:index>
  );

  expect(v1.render()).toBe("[k:string]:unknown");
  expect(v2.render()).toBe("[k:number]:unknown");
  expect(v3.render()).toBe("[k:symbol]:unknown");
});

test("t:index throws an error with other primitive types", () => {
  expect(() => (
    <t:index>
      <ident name="k" />
      <t:primitive type="any" />
      <t:primitive type="unknown" />
    </t:index>
  )).toThrow();
  expect(() => (
    <t:index>
      <ident name="k" />
      <t:primitive type="unknown" />
      <t:primitive type="unknown" />
    </t:index>
  )).toThrow();
  expect(() => (
    <t:index>
      <ident name="k" />
      <t:primitive type="boolean" />
      <t:primitive type="unknown" />
    </t:index>
  )).toThrow();
  expect(() => (
    <t:index>
      <ident name="k" />
      <t:primitive type="void" />
      <t:primitive type="unknown" />
    </t:index>
  )).toThrow();
});
