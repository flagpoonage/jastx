import { expect, test } from "vitest";

test("stmt:try renders correctly with simple try catch", () => {
  const v = (
    <stmt:try>
      <block />
      <catch-clause>
        <ident name="ex" />
        <block />
      </catch-clause>
    </stmt:try>
  );
  expect(v.render()).toBe("try{}catch(ex){}");
});

test("stmt:try renders correctly with only a finally block", () => {
  const v = (
    <stmt:try>
      <block />
      <block />
    </stmt:try>
  );
  expect(v.render()).toBe("try{}finally{}");
});

test("stmt:try renders correctly with both a catch and finally block", () => {
  const v = (
    <stmt:try>
      <block />
      <catch-clause>
        <ident name="ex" />
        <block />
      </catch-clause>
      <block />
    </stmt:try>
  );
  expect(v.render()).toBe("try{}catch(ex){}finally{}");
});

test("stmt:try throws if neither catch nor finally are specified", () => {
  expect(() => (
    <stmt:try>
      <block />
    </stmt:try>
  )).toThrow();
});
