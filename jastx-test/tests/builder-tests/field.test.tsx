import { expect, test } from "vitest";

test('<field> renders correctly as simple uninitialized identifier', () => {
  const v1 = (
    <field>
      <ident name="x" />
    </field>
  )

  expect(v1.render()).toBe('x');
})

test('<field> renders correctly with a type', () => {
  const v1 = (
    <field>
      <ident name="x" />
      <t:primitive type="string" />
    </field>
  )

  expect(v1.render()).toBe('x:string');
})

test('<field> renders correctly with an initializer', () => {
  const v1 = (
    <field>
      <ident name="x" />
      <t:primitive type="string" />
      <expr:template>
        test_
        <l:number value={10} />
      </expr:template>
    </field>
  )

  expect(v1.render()).toBe('x:string=`test_${10}`');
});

test('<field> renders correctly with a modifier', () => {
  const v1 = (
    <field modifier="private">
      <ident name="x" />
      <t:primitive type="string" />
      <expr:template>
        test_
        <l:number value={10} />
      </expr:template>
    </field>
  )

  expect(v1.render()).toBe('private x:string=`test_${10}`');
})

test('<field> renders correctly with a readonly flag', () => {
  const v1 = (
    <field modifier="private" readonly>
      <ident name="x" />
      <t:primitive type="string" />
      <expr:template>
        test_
        <l:number value={10} />
      </expr:template>
    </field>
  )

  expect(v1.render()).toBe('private readonly x:string=`test_${10}`');
})