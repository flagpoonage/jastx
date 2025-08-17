// This is an E2E test to write the entire for-in-builder using our own JASTX
/* Reference source file

import { assertNChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_TYPES, STATEMENT_TYPES } from "../types.js";

const type = "stmt:for-in";

export interface ForInStatementProps {
  children: AstNode[] | AstNode;
  variableType?: "const" | "let" | "var";
}

export interface ForInStatementNode extends AstNode {
  type: typeof type;
  props: ForInStatementProps;
}

export function isForInStatement(v: AstNode): v is ForInStatementNode {
  return v.type === "stmt:for-in";
}

export function createForInStatement(
  props: ForInStatementProps
): ForInStatementNode {
  assertNChildren(type, 3, props);

  const { variableType = "const" } = props;

  const walker = createChildWalker(type, props);

  const [ident, iterable, block] = walker.spliceAssertExactPath(
    [
      "ident",
      ["ident", "l:object", "l:array", "arrow-function", ...EXPRESSION_TYPES],
      ["block", ...STATEMENT_TYPES],
    ],
    { noTrailing: true }
  );

  assertValue(ident);
  assertValue(iterable);
  assertValue(block);

  return {
    type: type,
    props,
    render: () =>
      `for(${variableType} ${ident.render()} in ${iterable.render()})${block.render()}`,
  };
}
*/

import { AstNode } from "jastx/types";
import { expect, test } from "vitest";
import * as Q from "jastx/build";

test("E2E: for-in builder", () => {
  const ast_node_ref = (
    <t:ref>
      <ident name="AstNode" />
    </t:ref>
  );

  const AssertValue = (props: { name: string }) => (
    <stmt:expr>
      <expr:call>
        <ident name="assertValue" />
        <ident name={props.name} />
      </expr:call>
    </stmt:expr>
  );

  const SingleConst = (props: { name: string; children: AstNode }) => (
    <stmt:var>
      <dclr:var-list type="const">
        <dclr:var>
          <ident name={props.name} />
          {props.children}
        </dclr:var>
      </dclr:var-list>
    </stmt:var>
  );

  const v1 = (
    <source-file type="module">
      <dclr:import>
        <named-imports>
          <ident name="assertNChildren" />
          <ident name="assertValue" />
        </named-imports>
        <l:string value="../asserts.js" />
      </dclr:import>
      <dclr:import>
        <named-imports>
          <ident name="createChildWalker" />
        </named-imports>
        <l:string value="../child-walker.js" />
      </dclr:import>
      <dclr:import>
        <named-imports>
          <ident name="AstNode" />
          <ident name="EXPRESSION_TYPES" />
          <ident name="STATEMENT_TYPES" />
        </named-imports>
        <l:string value="../types.js" />
      </dclr:import>
      <SingleConst name="type">
        <l:string value="stmt:for-in" />
      </SingleConst>
      <t:interface_ exported>
        <ident name="ForInStatementProps" />
        <t:property>
          <ident name="children" />
          <t:union>
            <t:array>{ast_node_ref}</t:array>
            {ast_node_ref}
          </t:union>
        </t:property>
        <t:property optional>
          <ident name="variableType" />
          <t:union>
            <l:string value="const" />
            <l:string value="let" />
            <l:string value="var" />
          </t:union>
        </t:property>
      </t:interface_>
      <t:interface_>
        <ident name="ForInStatementNode" />
        <heritage-clause>
          <ident name="AstNode" />
        </heritage-clause>
        <t:property>
          <ident name="type" />
          <t:query>
            <ident name="type" />
          </t:query>
        </t:property>
        <t:property>
          <ident name="props" />
          <t:ref>
            <ident name="ForInStatementProps" />
          </t:ref>
        </t:property>
      </t:interface_>
      <dclr:function exported>
        <ident name="isForInStatement" />
        <param>
          <ident name="v" />
          {ast_node_ref}
        </param>
        <t:predicate>
          <ident name="v" />
          <t:ref>
            <ident name="ForInStatement" />
          </t:ref>
        </t:predicate>
        <block>
          <stmt:return>
            <expr:binary operator="===">
              <expr:prop-access>
                <ident name="v" />
                <ident name="type" />
              </expr:prop-access>
              <l:string value="stmt:for-in" />
            </expr:binary>
          </stmt:return>
        </block>
      </dclr:function>
      <dclr:function exported>
        <ident name="createForInStatement" />
        <param>
          <ident name="props" />
          <t:ref>
            <ident name="ForInStatementProps" />
          </t:ref>
        </param>
        <t:ref>
          <ident name="ForInStatement" />
        </t:ref>
        <block>
          <stmt:expr>
            <expr:call>
              <ident name="assertNChildren" />
              <ident name="type" />
              <l:number value={3} />
              <ident name="props" />
            </expr:call>
          </stmt:expr>
          <stmt:var>
            <dclr:var-list type="const">
              <dclr:var>
                <bind:object>
                  <bind:object-elem mode="initializer">
                    <ident name="variableType" />
                    <l:string value="const" />
                  </bind:object-elem>
                </bind:object>
                <ident name="props" />
              </dclr:var>
            </dclr:var-list>
          </stmt:var>
          <SingleConst name="walker">
            <expr:call>
              <ident name="createChildWalker" />
              <ident name="type" />
              <ident name="props" />
            </expr:call>
          </SingleConst>
          <stmt:var>
            <dclr:var-list type="const">
              <dclr:var>
                <bind:array>
                  <ident name="ident" />
                  <ident name="iterable" />
                  <ident name="block" />
                </bind:array>
                <expr:call>
                  <expr:prop-access>
                    <ident name="walker" />
                    <ident name="spliceAssertExactPath" />
                  </expr:prop-access>
                  <l:array>
                    <l:string value="ident" />
                    <l:array>
                      <l:string value="ident" />
                      <l:string value="l:object" />
                      <l:string value="l:array" />
                      <l:string value="arrow-function" />
                      <spread-element>
                        <ident name="EXPRESSION_TYPES" />
                      </spread-element>
                    </l:array>
                    <l:array>
                      <l:string value="block" />
                      <spread-element>
                        <ident name="STATEMENT_TYPES" />
                      </spread-element>
                    </l:array>
                  </l:array>
                  <l:object>
                    <property>
                      <ident name="noTrailing" />
                      <l:boolean value={true} />
                    </property>
                  </l:object>
                </expr:call>
              </dclr:var>
            </dclr:var-list>
          </stmt:var>
          <AssertValue name="ident" />
          <AssertValue name="iterable" />
          <AssertValue name="block" />
          <stmt:return>
            <l:object>
              <property>
                <ident name="type" />
                <ident name="type" />
              </property>
              <property>
                <ident name="props" />
              </property>
              <property>
                <ident name="render" />
                <arrow-function>
                  <expr:template>
                    {"for("}
                    <ident name="variableType" />{" "}
                    <expr:call>
                      <ident name="ident" />
                      <ident name="render" />
                    </expr:call>
                    {" in "}
                    <expr:call>
                      <ident name="iterable" />
                      <ident name="render" />
                    </expr:call>
                    {")"}
                    <expr:call>
                      <ident name="block" />
                      <ident name="render" />
                    </expr:call>
                  </expr:template>
                </arrow-function>
              </property>
            </l:object>
          </stmt:return>
        </block>
      </dclr:function>
    </source-file>
  );

  expect(v1.render()).toBe(
    'import {assertNChildren,assertValue} from "../asserts.js";import {createChildWalker} from "../child-walker.js";import {AstNode,EXPRESSION_TYPES,STATEMENT_TYPES} from "../types.js";const type="stmt:for-in";export interface ForInStatementProps{children:AstNode[]|AstNode;variableType?:"const"|"let"|"var";};interface ForInStatementNode extends AstNode{type:typeof type;props:ForInStatementProps;};export function isForInStatement(v:AstNode):v is ForInStatement{return v.type === "stmt:for-in";};export function createForInStatement(props:ForInStatementProps):ForInStatement{assertNChildren(type,3,props);const {variableType="const"}=props;const walker=createChildWalker(type,props);const [ident,iterable,block]=walker.spliceAssertExactPath(["ident",["ident","l:object","l:array","arrow-function",...EXPRESSION_TYPES],["block",...STATEMENT_TYPES]],{noTrailing:true});assertValue(ident);assertValue(iterable);assertValue(block);return {type:type,props,render:()=>`for(${variableType} ${ident(render)} in ${iterable(render)})${block(render)}`};}'
  );
});
