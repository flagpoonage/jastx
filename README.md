# Completed Sytax

- as expression ({} as unknown)
- array binding ([a,b] = [1,2]);
- object binding ({ a, b } = { a: 1, b: 2 })
- call expression (callFunction())
- element access expression (a[1])
- identifier (a)
- literals
  - number (1)
  - string ("hello")
  - boolean (true)
  - bigint (1n)
  - regex (/(.?)/g)
  - object ({ a: 10 })
  - array ([1,2,3])
- non null expression (a!)
- parenthesis expression ( (a) )
- property access expression (a.b)
- template expression (`test ${a} template`)
- type primitive (string)
- variable declaration (a:string="hello")
- variable declaration list (const a:string="hello",c=10)
- variable statement (export const a:string = "hello";)

# Missing Syntax

- import statements
- export assignments
- export declarations
- the majority of all meta type stuff (interfaces, type literals, conditionals etc);
- if/else if/else statements
- for loops
- while/do-while loops
- function declaration
- function expression
- arrow function expression
- rest/spread syntax (...rest)
- stop statements (return/throw/break/continue)
- labels (pretty rare syntax for controlling break/continue)
- binary expressions (all the various operators)
- switch statement
