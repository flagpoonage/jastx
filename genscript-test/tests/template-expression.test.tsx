import { expect, test } from "vitest";

test("expr:template renders correctly with no content", () => {
  const v = <expr:template />;
  expect(v.render()).toBe("``");
});

test("expr:template renders correctly with literal text", () => {
  const v = <expr:template>Hey my name is james</expr:template>;
  expect(v.render()).toBe("`Hey my name is james`");
});

test("expr:template renders correctly with simple literals", () => {
  const v = (
    <expr:template>
      {`Hey my name is `}
      <l:bigint value={20} />
      {` james. `}
      <l:string value="Hello!" />
    </expr:template>
  );
  expect(v.render()).toBe('`Hey my name is ${20n} james. ${"Hello!"}`');
});

test("expr:template renders correctly with expressions", () => {
  const v = (
    <expr:template>
      Hey my name is{" "}
      <expr:elem-access optionalChain={true}>
        <ident name="test" />
        <l:number value={10} />
      </expr:elem-access>{" "}
      james
    </expr:template>
  );
  expect(v.render()).toBe("`Hey my name is ${test?.[10]} james`");
});
