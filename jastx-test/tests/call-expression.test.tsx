import { expect, test } from "vitest";

test("expr:call renders correctly", () => {
  const v = (
    <expr:call>
      <ident name="x" />
    </expr:call>
  );
  expect(v.render()).toBe("x()");
});

test("expr:call renders correctly with property access", () => {
  const v = (
    <expr:call>
      <expr:prop-access>
        <ident name="x" />
        <ident name="y" />
      </expr:prop-access>
    </expr:call>
  );
  expect(v.render()).toBe("x.y()");
});

test("expr:call renders correctly with property access and optional chaining", () => {
  const v = (
    <expr:call optionalChain={true}>
      <expr:prop-access>
        <ident name="x" />
        <ident name="y" />
      </expr:prop-access>
    </expr:call>
  );
  expect(v.render()).toBe("x.y?.()");
});

test("expr:call renders correctly with element access", () => {
  const v = (
    <expr:call>
      <expr:elem-access>
        <ident name="x" />
        <l:number value={1} />
      </expr:elem-access>
    </expr:call>
  );
  expect(v.render()).toBe("x[1]()");
});

test("expr:call renders correctly with element access and optional chaining", () => {
  const v = (
    <expr:call optionalChain={true}>
      <expr:elem-access>
        <ident name="x" />
        <l:number value={1} />
      </expr:elem-access>
    </expr:call>
  );
  expect(v.render()).toBe("x[1]?.()");
});

test("expr:call renders correctly with parameters", () => {
  const v = (
    <expr:call>
      <ident name="x" />
      <l:string value="test" />
      <expr:elem-access>
        <ident name="y" />
        <l:number value={1} />
      </expr:elem-access>
    </expr:call>
  );
  expect(v.render()).toBe('x("test",y[1])');
});

test("expr:call renders correctly with type arguments", () => {
  const v = (
    <expr:call>
      <ident name="x" />
      <t:primitive type="boolean" />
      <l:boolean value={true} />
    </expr:call>
  );
  expect(v.render()).toBe("x<boolean>(true)");
});
