import { expect, test } from "vitest";

test('<set-accessor> renders a basic get block', () => {
  const v1 = (
    <set-accessor>
      <ident name="prop" />
      <param>
        <ident name="k" />
      </param>
      <block />
    </set-accessor>
  );

  expect(v1.render()).toBe('set prop(k){}')
})

test('<set-accessor> renders with type parameters', () => {
  const v1 = (
    <set-accessor>
      <ident name="prop" />
      <t:param>
        <ident name="X" />
      </t:param>
      <param>
        <ident name="k" />
      </param>
      <block />
    </set-accessor>
  );

  expect(v1.render()).toBe('set prop<X>(k){}')
})


test('<set-accessor> renders with visibility modifier', () => {
  const v1 = (
    <set-accessor modifier="private">
      <ident name="prop" />
      <t:param>
        <ident name="X" />
      </t:param>
      <param>
        <ident name="k" />
      </param>
      <block />
    </set-accessor>
  );

  expect(v1.render()).toBe('private set prop<X>(k){}')
})

test('<set-accessor> throws when no parameters are specified', () => {
  expect(() => (
    <set-accessor>
      <ident name="prop" />
      <t:param>
        <ident name="X" />
      </t:param>
      <t:ref>
        <ident name="X" />
      </t:ref>
      <block />
    </set-accessor>
  )).toThrow();
})
test('<set-accessor> throws when more than one parameter is specified', () => {
  expect(() => (
    <set-accessor>
      <ident name="prop" />
      <t:param>
        <ident name="X" />
      </t:param>
      <param>
        <ident name="k" />
      </param>
      <param>
        <ident name="v" />
      </param>
      <t:ref>
        <ident name="X" />
      </t:ref>
      <block />
    </set-accessor>
  )).toThrow();
})