import { expect, test } from "vitest";

test("arrow-function renders correctly with implicit return", () => {
  const v1 = (
    <arrow-function>
      <l:number value={20} />
    </arrow-function>
  );

  expect(v1.render()).toBe(`()=>20`);
  const v2 = (
    <arrow-function>
      <arrow-function>
        <l:number value={20} />
      </arrow-function>
    </arrow-function>
  );

  expect(v2.render()).toBe(`()=>()=>20`);
});

test("arrow-function renders correctly with asymc implicit return", () => {
  const v1 = (
    <arrow-function async={true}>
      <l:number value={20} />
    </arrow-function>
  );

  expect(v1.render()).toBe(`async()=>20`);
  const v2 = (
    <arrow-function async={true}>
      <arrow-function>
        <l:number value={20} />
      </arrow-function>
    </arrow-function>
  );

  expect(v2.render()).toBe(`async()=>()=>20`);
});

test("arrow-function renders correctly with block element", () => {
  const v1 = (
    <arrow-function>
      <block>
        {/** TODO: Simpler exmaples when you have more statement types */}
        <var:statement>
          <var:declaration-list type="let">
            <var:declaration>
              <ident name="c" />
            </var:declaration>
          </var:declaration-list>
        </var:statement>
      </block>
    </arrow-function>
  );

  expect(v1.render()).toBe(`()=>{let c;}`);
});

test("arrow-function throws an error with multiple implict returns", () => {
  expect(() => (
    <arrow-function>
      <l:number value={20} />
      <l:number value={20} />
    </arrow-function>
  )).toThrow();
});

test("arrow-function throws an error with implict returns and a block", () => {
  expect(() => (
    <arrow-function>
      <l:number value={20} />
      <block>
        {/** TODO: Simpler exmaples when you have more statement types */}
        <var:statement>
          <var:declaration-list type="let">
            <var:declaration>
              <ident name="c" />
            </var:declaration>
          </var:declaration-list>
        </var:statement>
      </block>
    </arrow-function>
  )).toThrow();
});

test("arrow-function throws an error with if values follow the block", () => {
  expect(() => (
    <arrow-function>
      <block>
        {/** TODO: Simpler exmaples when you have more statement types */}
        <var:statement>
          <var:declaration-list type="let">
            <var:declaration>
              <ident name="c" />
            </var:declaration>
          </var:declaration-list>
        </var:statement>
      </block>
      <l:number value={20} />
    </arrow-function>
  )).toThrow();
});

test("arrow-function renders without parenthesis for single identifier parameter", () => {
  const v1 = (
    <arrow-function>
      <param>
        <ident name="x" />
      </param>
      <expr:call>
        <ident name="x" />
      </expr:call>
    </arrow-function>
  );

  expect(v1.render()).toBe(`x=>x()`);

  const v2 = (
    <arrow-function async={true}>
      <param>
        <ident name="x" />
      </param>
      <expr:call>
        <ident name="x" />
      </expr:call>
    </arrow-function>
  );

  expect(v2.render()).toBe(`async x=>x()`);
});

test("arrow-function renders correctly with single typed parameter", () => {
  const v1 = (
    <arrow-function>
      <param>
        <ident name="x" />
        <t:primitive type="number" />
      </param>
      <expr:call>
        <expr:prop-access>
          <ident name="x" />
          <ident name="toString" />
        </expr:prop-access>
      </expr:call>
    </arrow-function>
  );

  expect(v1.render()).toBe(`(x:number)=>x.toString()`);
});

test("arrow-function renders correctly with multiple parameters", () => {
  const v1 = (
    <arrow-function>
      <param>
        <ident name="x" />
        <t:primitive type="number" />
      </param>
      <param>
        <ident name="y" />
        <l:string value={"test"} />
      </param>
      <expr:call>
        <expr:prop-access>
          <ident name="x" />
          <ident name="toString" />
        </expr:prop-access>
      </expr:call>
    </arrow-function>
  );

  expect(v1.render()).toBe(`(x:number,y="test")=>x.toString()`);
});

test("arrow-function renders correctly with type parameters", () => {
  const v1 = (
    <arrow-function>
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
      <expr:call>
        <expr:prop-access>
          <ident name="x" />
          <ident name="toString" />
        </expr:prop-access>
      </expr:call>
    </arrow-function>
  );

  expect(v1.render()).toBe(`<T,Y extends number>(x:T)=>x.toString()`);
});

test("arrow-function renders correctly with return type", () => {
  const v1 = (
    <arrow-function>
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
      <expr:call>
        <expr:prop-access>
          <ident name="x" />
          <ident name="toString" />
        </expr:prop-access>
      </expr:call>
    </arrow-function>
  );

  expect(v1.render()).toBe(`<T,Y extends number>(x:T):string=>x.toString()`);
});

test("arrow-function renders correctly with return type predicate", () => {
  const v1 = (
    <arrow-function>
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
      <expr:call>
        <expr:prop-access>
          <ident name="x" />
          <ident name="toString" />
        </expr:prop-access>
      </expr:call>
    </arrow-function>
  );

  expect(v1.render()).toBe(
    `<T,Y extends number>(x:T):x is string=>x.toString()`
  );
});

test("arrow-function renders correctly with return type asserts predicate", () => {
  const v1 = (
    <arrow-function>
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
      <expr:call>
        <expr:prop-access>
          <ident name="x" />
          <ident name="toString" />
        </expr:prop-access>
      </expr:call>
    </arrow-function>
  );

  expect(v1.render()).toBe(
    `<T,Y extends number>(x:T):asserts x is string=>x.toString()`
  );
});
