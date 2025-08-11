import { expect, test } from "vitest";

test("stmt:var renders correctly", () => {
  const v = (
    <stmt:var>
      <dclr:var-list type="const">
        <dclr:var>
          <ident name="x" />
          <t:primitive type="string" />
          <l:string value="Hello" />
        </dclr:var>
      </dclr:var-list>
    </stmt:var>
  );
  expect(v.render()).toBe('const x:string="Hello"');
});

test("stmt:var renders correctly with export", () => {
  const v = (
    <stmt:var exported={true}>
      <dclr:var-list type="const">
        <dclr:var>
          <ident name="x" />
          <t:primitive type="string" />
          <l:string value="Hello" />
        </dclr:var>
      </dclr:var-list>
    </stmt:var>
  );
  expect(v.render()).toBe('export const x:string="Hello"');
});
