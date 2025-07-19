import { expect, test } from "vitest";

test("t:predicate renders correctly with ident and type", () => {
  const v1 = (
    <t:predicate>
      <ident name="x" />
      <t:primitive type="string" />
    </t:predicate>
  );

  expect(v1.render()).toBe(`x is string`);
});

test("t:predicate renders correctly with more complex type", () => {
  const v1 = (
    <t:predicate>
      <ident name="x" />
      <t:cond>
        {["A", "B", "C", "D"].map((r) => (
          <t:ref>
            <ident name={r} />
          </t:ref>
        ))}
      </t:cond>
    </t:predicate>
  );

  expect(v1.render()).toBe(`x is A extends B?C:D`);
});

test("t:predicate renders correctly with assert options child", () => {
  const v1 = (
    <t:predicate asserts={true}>
      <ident name="x" />
      <t:primitive type="string" />
    </t:predicate>
  );

  expect(v1.render()).toBe(`asserts x is string`);
});
