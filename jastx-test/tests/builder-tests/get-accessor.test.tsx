import { expect, test } from "vitest";

test('<get-accessor> renders a basic get block', () => {
  const v1 = (
    <get-accessor>
      <ident name="prop" />
      <block />
    </get-accessor>
  );

  expect(v1.render()).toBe('get prop(){}')
})

test('<get-accessor> renders with type parameters', () => {
  const v1 = (
    <get-accessor>
      <ident name="prop" />
      <t:param>
        <ident name="X" />
      </t:param>
      <block />
    </get-accessor>
  );

  expect(v1.render()).toBe('get prop<X>(){}')
})

test('<get-accessor> renders with result type', () => {
  const v1 = (
    <get-accessor>
      <ident name="prop" />
      <t:param>
        <ident name="X" />
      </t:param>
      <t:ref>
        <ident name="X" />
      </t:ref>
      <block />
    </get-accessor>
  );

  expect(v1.render()).toBe('get prop<X>():X{}')
})

test('<get-accessor> renders with visibility modifier', () => {
  const v1 = (
    <get-accessor modifier="private">
      <ident name="prop" />
      <t:param>
        <ident name="X" />
      </t:param>
      <t:ref>
        <ident name="X" />
      </t:ref>
      <block />
    </get-accessor>
  );

  expect(v1.render()).toBe('private get prop<X>():X{}')
})

test('<get-accessor> throws when any parameters are added', () => {

  expect(() => (
    <get-accessor>
      <ident name="prop" />
      <t:param>
        <ident name="X" />
      </t:param>
      <param>
        <ident name="k" />
      </param>
      <t:ref>
        <ident name="X" />
      </t:ref>
      <block />
    </get-accessor>
  )).toThrow();
})