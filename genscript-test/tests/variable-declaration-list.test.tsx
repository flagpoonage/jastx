import { expect, test } from "vitest";

test("var:declaration-list renders correctly with const", () => {
  const v = (
    <var:declaration-list type="const">
      <var:declaration>
        <ident name="x" />
        <t:primitive type="string" />
        <l:string value="Hello" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('const x:string="Hello"');
});

test("var:declaration-list renders correctly with let", () => {
  const v = (
    <var:declaration-list type="let">
      <var:declaration>
        <ident name="x" />
        <t:primitive type="string" />
        <l:string value="Hello" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('let x:string="Hello"');
});

test("var:declaration-list renders correctly with var", () => {
  const v = (
    <var:declaration-list type="var">
      <var:declaration>
        <ident name="x" />
        <t:primitive type="string" />
        <l:string value="Hello" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('var x:string="Hello"');
});

test("var:declaration-list renders correctly with a multiple declarations", () => {
  const v = (
    <var:declaration-list type="const">
      <var:declaration>
        <ident name="x" />
        <t:primitive type="string" />
        <l:string value="Hello" />
      </var:declaration>
      <var:declaration>
        <ident name="y" />
        <t:primitive type="number" />
        <expr:as type="number">
          <l:number value={10} />
        </expr:as>
      </var:declaration>
      <var:declaration>
        <ident name="z" />
        <l:object />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('const x:string="Hello",y:number=10 as number,z={}');
});
