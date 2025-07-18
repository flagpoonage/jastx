# Import Declarations

The import declaration and it's sub components should cover all varieties of top
level import declaration

```typescript
import 'module';
import A from 'module';
import { B } from 'module';
import { C as D } from 'module';
import E, { F } from 'module';
import type G from 'module';
import type { H } from 'module';
import { type I } from 'module';
import J from 'module' with { type: 'json' };
```

MDN Docs:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

Actual Spec:
https://tc39.es/ecma262/#prod-ImportDeclaration

AST Viewer Examples
https://ts-ast-viewer.com/#code/JYWwDg9gTgLgBAchBAJgVwDYFMEG4BQokscAgnAGZQQiLLrZ6HjTwDecAQnAL6XW0kqTDgJFWcDgGE4AQwDOcACK9+NOsMZiWJAKIAaSXABiqquqENRzYvBgBPMFjgBxNYPoim4kg6dGACTMBDStvHXY4P2cASWCLTy0bCQApd1CvOAB3YBgACyNogC5EACt5CAA7BF5cIA

It does not need cover dynamic imports `import('module')` as that is a completely
different expression syntax rather than a declaration.

The top level should be named import-declaration. Since there's several import
syntax nodes, it might be better to group them in a prefix like imp, so `imp:declare`;
