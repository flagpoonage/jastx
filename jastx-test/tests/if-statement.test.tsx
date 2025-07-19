import { expect, test } from "vitest";

test("if-statement renders correctly with a single expression", () => {
  const v = (
    <if-statement>
      <ident name="v" />
      <expr:statement>
        <expr:call>
          <ident name="v" />
        </expr:call>
      </expr:statement>
    </if-statement>
  );

  expect(v.render()).toBe("if(v)v()");
});

test("if-statement renders correctly with a block", () => {
  const v = (
    <if-statement>
      <ident name="v" />
      <block>
        <expr:statement>
          <expr:call>
            <ident name="v" />
          </expr:call>
        </expr:statement>
      </block>
    </if-statement>
  );

  expect(v.render()).toBe("if(v){v();}");
});

test("if-statement renders correctly with an else single statement", () => {
  const v = (
    <if-statement>
      <ident name="v" />
      <expr:statement>
        <expr:call>
          <ident name="v" />
        </expr:call>
      </expr:statement>
      <expr:statement>
        <expr:call>
          <ident name="x" />
        </expr:call>
      </expr:statement>
    </if-statement>
  );

  expect(v.render()).toBe("if(v)v();else x()");
});

test("if-statement renders correctly with an else block", () => {
  const v = (
    <if-statement>
      <ident name="v" />
      <expr:statement>
        <expr:call>
          <ident name="v" />
        </expr:call>
      </expr:statement>
      <block>
        <expr:statement>
          <expr:call>
            <ident name="x" />
          </expr:call>
        </expr:statement>
      </block>
    </if-statement>
  );

  expect(v.render()).toBe("if(v)v();else{x();}");
  const v2 = (
    <if-statement>
      <ident name="v" />
      <block>
        <expr:statement>
          <expr:call>
            <ident name="v" />
          </expr:call>
        </expr:statement>
      </block>
      <block>
        <expr:statement>
          <expr:call>
            <ident name="x" />
          </expr:call>
        </expr:statement>
      </block>
    </if-statement>
  );

  expect(v2.render()).toBe("if(v){v();}else{x();}");
});

test("if-statement renders correctly with nested if statements", () => {
  const v = (
    <if-statement>
      <ident name="v" />
      <block>
        <expr:statement>
          <expr:call>
            <ident name="x" />
          </expr:call>
        </expr:statement>
      </block>
      <if-statement>
        <ident name="a" />
        <block>
          <expr:statement>
            <expr:call>
              <ident name="a" />
            </expr:call>
          </expr:statement>
        </block>
        <block>
          <expr:statement>
            <expr:call>
              <ident name="v" />
            </expr:call>
          </expr:statement>
        </block>
      </if-statement>
    </if-statement>
  );

  expect(v.render()).toBe("if(v){x();}else if(a){a();}else{v();}");
});
