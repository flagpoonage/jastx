import { expect, test } from "vitest";

test("t:param renders correctly with single identifier", () => {
  const v1 = (
    <t:param>
      <ident name="T" />
    </t:param>
  );

  expect(v1.render()).toBe(`T`);
});

test("t:param renders extends by default with a second child", () => {
  const v1 = (
    <t:param>
      <ident name="T" />
      <t:primitive type="string" />
    </t:param>
  );

  expect(v1.render()).toBe(`T extends string`);
});

test("t:param renders a default type when binary operation is explicit on a second child", () => {
  const v1 = (
    <t:param binaryOperation="default">
      <ident name="T" />
      <t:primitive type="string" />
    </t:param>
  );

  expect(v1.render()).toBe(`T=string`);
});

test("t:param renders correctly with 3 children specified", () => {
  const v1 = (
    <t:param>
      <ident name="T" />
      <t:primitive type="string" />
      <t:ref>
        <ident name="K" />
      </t:ref>
    </t:param>
  );

  expect(v1.render()).toBe(`T extends string=K`);
});

test("t:param ignores binaryOperation with 3 children specified", () => {
  const v1 = (
    <t:param binaryOperation="default">
      <ident name="T" />
      <t:primitive type="string" />
      <t:ref>
        <ident name="K" />
      </t:ref>
    </t:param>
  );

  expect(v1.render()).toBe(`T extends string=K`);

  const v2 = (
    <t:param binaryOperation="extends">
      <ident name="T" />
      <t:primitive type="string" />
      <t:ref>
        <ident name="K" />
      </t:ref>
    </t:param>
  );

  expect(v2.render()).toBe(`T extends string=K`);
});
