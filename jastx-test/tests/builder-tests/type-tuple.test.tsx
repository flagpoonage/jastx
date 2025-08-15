import { expect, test } from "vitest";

test("<t:tuple> renders correctly as empty", () => {
  const v1 = <t:tuple />;

  expect(v1.render()).toBe("[]");
});

test("<t:tuple> renders correctly with contained types", () => {
  const v1 = (
    <t:tuple>
      <t:ref>
        <ident name="X" />
      </t:ref>
      <l:number value={10} />
      <l:string value="test" />
    </t:tuple>
  );

  expect(v1.render()).toBe('[X,10,"test"]');
});

test("<t:tuple> renders correctly as readonly", () => {
  const v1 = (
    <t:tuple readonly>
      <t:ref>
        <ident name="X" />
      </t:ref>
      <l:number value={10} />
      <l:string value="test" />
      <t:query>
        <ident name="x" />
      </t:query>
    </t:tuple>
  );

  expect(v1.render()).toBe('readonly [X,10,"test",typeof x]');
});
