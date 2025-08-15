import { expect, test } from "vitest";

test("expr:elem-access renders correctly with identifiers", () => {
  const v = (
    <expr:elem-access>
      <ident name="x" />
      <ident name="y" />
    </expr:elem-access>
  );
  expect(v.render()).toBe("x[y]");
});

test("expr:elem-access renders correctly with a string literal LHS", () => {
  const v = (
    <expr:elem-access>
      <l:string value="Hello" />
      <ident name="y" />
    </expr:elem-access>
  );
  expect(v.render()).toBe("\"Hello\"[y]");
});

test("expr:elem-access renders correctly with a boolean literal LHS", () => {
  const v = (
    <expr:elem-access>
      <l:boolean value={false} />
      <ident name="y" />
    </expr:elem-access>
  );
  expect(v.render()).toBe("false[y]");
});

test("expr:elem-access renders correctly with a number literal  LHS", () => {
  const v = (
    <expr:elem-access>
        <l:number value={10} />
      <ident name="y" />
    </expr:elem-access>
  );
  expect(v.render()).toBe("10[y]");
});

test("expr:elem-access renders correctly with a number literal in parenthesis LHS", () => {
  const v = (
    <expr:elem-access>
      <expr:parens>
        <l:number value={10} />
      </expr:parens>
      <ident name="y" />
    </expr:elem-access>
  );
  expect(v.render()).toBe("(10)[y]");
});

test("expr:elem-access renders correctly with a nested element access", () => {
  const v = (
    <expr:elem-access>
      <expr:elem-access>
        <ident name="a" />
        <ident name="b" />
      </expr:elem-access>
      <ident name="c" />
    </expr:elem-access>
  );
  expect(v.render()).toBe("a[b][c]");
});

test("expr:elem-access renders correctly with a nested property access", () => {
  const v = (
    <expr:elem-access>
      <expr:prop-access>
        <ident name="a" />
        <ident name="b" />
      </expr:prop-access>
      <ident name="c" />
    </expr:elem-access>
  );
  expect(v.render()).toBe("a.b[c]");
});

test("expr:elem-access renders correctly with a number literal index", () => {
  const v = (
    <expr:elem-access>
      <ident name="a" />
      <l:number value={10} />
    </expr:elem-access>
  );
  expect(v.render()).toBe("a[10]");
});

test("expr:elem-access renders correctly with a string literal index", () => {
  const v = (
    <expr:elem-access>
      <ident name="a" />
      <l:string value="hello" />
    </expr:elem-access>
  );
  expect(v.render()).toBe("a[\"hello\"]");
});

test("expr:elem-access renders correctly with optional chaining", () => {
  const v = (
    <expr:elem-access optionalChain={true}>
      <expr:elem-access>
        <ident name="a" />
        <ident name="b" />
      </expr:elem-access>
      <ident name="c" />
    </expr:elem-access>
  );
  expect(v.render()).toBe("a[b]?.[c]");
});

// test("expr:elem-access throws an error with a number literal LHS", () => {
//   expect(() => (
//     <expr:elem-access>
//       <l:number value={10} />
//       <ident name="toString" />
//     </expr:elem-access>
//   )).toThrowError();
// });

// test("expr:elem-access throws an error with a prop-access RHS", () => {
//   expect(() => (
//     <expr:elem-access>
//       <ident name="c" />
//       <expr:elem-access>
//         <ident name="a" />
//         <ident name="b" />
//       </expr:elem-access>
//     </expr:elem-access>
//   )).toThrowError();
// });

