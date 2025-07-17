import { expect, test } from "vitest";

test("var:statement renders correctly", () => {
  const v = (
    <var:statement>
      <var:declaration-list type="const">
        <var:declaration>
          <ident name="x" />
          <t:primitive type="string" />
          <l:string value="Hello" />
        </var:declaration>
      </var:declaration-list>
    </var:statement>
  );
  expect(v.render()).toBe('const x:string="Hello"');
});

test("var:statement renders correctly with export", () => {
  const v = (
    <var:statement exported={true}>
      <var:declaration-list type="const">
        <var:declaration>
          <ident name="x" />
          <t:primitive type="string" />
          <l:string value="Hello" />
        </var:declaration>
      </var:declaration-list>
    </var:statement>
  );
  expect(v.render()).toBe('export const x:string="Hello"');
});
