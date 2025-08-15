import { expect, test } from "vitest";

test("<stmt:return> renders correctly with no body", () => {
  const v = <stmt:return />;

  expect(v.render()).toBe("return");
});

test("<stmt:return> renders correctly with a literal", () => {
  const v = (
    <stmt:return>
      <l:boolean value={true} />
    </stmt:return>
  );

  expect(v.render()).toBe("return true");
});

test("<stmt:return> renders correctly with an expression", () => {
  const v = (
    <stmt:return>
      <expr:call>
        <ident name="someFunction" />
      </expr:call>
    </stmt:return>
  );

  expect(v.render()).toBe("return someFunction()");
});
