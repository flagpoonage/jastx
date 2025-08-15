import { expect, test } from "vitest";

test("stmt:if renders correctly with a single expression", () => {
  const v = (
    <stmt:if>
      <ident name="v" />
      <stmt:expr>
        <expr:call>
          <ident name="v" />
        </expr:call>
      </stmt:expr>
    </stmt:if>
  );

  expect(v.render()).toBe("if(v)v()");
});

test("stmt:if renders correctly with a block", () => {
  const v = (
    <stmt:if>
      <ident name="v" />
      <block>
        <stmt:expr>
          <expr:call>
            <ident name="v" />
          </expr:call>
        </stmt:expr>
      </block>
    </stmt:if>
  );

  expect(v.render()).toBe("if(v){v();}");
});

test("stmt:if renders correctly with an else single statement", () => {
  const v = (
    <stmt:if>
      <ident name="v" />
      <stmt:expr>
        <expr:call>
          <ident name="v" />
        </expr:call>
      </stmt:expr>
      <stmt:expr>
        <expr:call>
          <ident name="x" />
        </expr:call>
      </stmt:expr>
    </stmt:if>
  );

  expect(v.render()).toBe("if(v)v();else x()");
});

test("stmt:if renders correctly with an else block", () => {
  const v = (
    <stmt:if>
      <ident name="v" />
      <stmt:expr>
        <expr:call>
          <ident name="v" />
        </expr:call>
      </stmt:expr>
      <block>
        <stmt:expr>
          <expr:call>
            <ident name="x" />
          </expr:call>
        </stmt:expr>
      </block>
    </stmt:if>
  );

  expect(v.render()).toBe("if(v)v();else{x();}");
  const v2 = (
    <stmt:if>
      <ident name="v" />
      <block>
        <stmt:expr>
          <expr:call>
            <ident name="v" />
          </expr:call>
        </stmt:expr>
      </block>
      <block>
        <stmt:expr>
          <expr:call>
            <ident name="x" />
          </expr:call>
        </stmt:expr>
      </block>
    </stmt:if>
  );

  expect(v2.render()).toBe("if(v){v();}else{x();}");
});

test("stmt:if renders correctly with nested if statements", () => {
  const v = (
    <stmt:if>
      <ident name="v" />
      <block>
        <stmt:expr>
          <expr:call>
            <ident name="x" />
          </expr:call>
        </stmt:expr>
      </block>
      <stmt:if>
        <ident name="a" />
        <block>
          <stmt:expr>
            <expr:call>
              <ident name="a" />
            </expr:call>
          </stmt:expr>
        </block>
        <block>
          <stmt:expr>
            <expr:call>
              <ident name="v" />
            </expr:call>
          </stmt:expr>
        </block>
      </stmt:if>
    </stmt:if>
  );

  expect(v.render()).toBe("if(v){x();}else if(a){a();}else{v();}");
});
