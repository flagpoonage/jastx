import { expect, test } from "vitest";

test("var:declaration-list renders correctly with const", () => {
  const v = (
    <var:declaration-list type="const">
      <var:declaration type="string" identifier="x">
        <l:string value="Hello" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('const x:string="Hello"');
});

test("var:declaration-list renders correctly with let", () => {
  const v = (
    <var:declaration-list type="let">
      <var:declaration type="string" identifier="x">
        <l:string value="Hello" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('let x:string="Hello"');
});

test("var:declaration-list renders correctly with var", () => {
  const v = (
    <var:declaration-list type="var">
      <var:declaration type="string" identifier="x">
        <l:string value="Hello" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('var x:string="Hello"');
});

test("var:declaration-list renders correctly with a multiple declarations", () => {
  const v = (
    <var:declaration-list type="const">
      <var:declaration type="string" identifier="x">
        <l:string value="Hello" />
      </var:declaration>
      <var:declaration type="number" identifier="y">
        <expr:as type="number">
          <l:number value={10} />
        </expr:as>
      </var:declaration>
      <var:declaration identifier="z">
        <exact-literal value="{}" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('const x:string="Hello",y:number=10 as number,z={}');
});
