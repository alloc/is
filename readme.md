# @alloc/is

Runtime type checking for TypeScript (inspired by `@sindresorhus/is`)

- **isomorphic** (no DOM or NodeJS types)
- **type guards** (for type narrowing)
- **fully tested** (each possible type is tested on every type checker)

## Usage

First, do `yarn add is@npm:@alloc/is` if you never use the `npm` CLI.
Otherwise, you need to import `@alloc/is` instead of `is`.

```ts
import { is } from 'is'

//
// Get the type name of a value.
// Object types are camel case.
//

is.what(0) // 'number'
is.what({}) // 'Object'

//
// Check the constructor of a value.
//

is.type(0, Number) // true
is.type({}, Object) // true
is.type([], Object) // false

//
// Find a constructor in a value's prototype chain.
//

is.kind([], Object) // true

//
// Check if the value is a specific type.
//

is.number(0) // true
is.array([]) // true
```

**See the tests for expected behavior.** They are very readable, just search for `test(`
to jump between the tests of each `is.` function.

## API

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator

- `is.what(value)` Get the type name of a value
- `is.type(value, constructor)` Check the constructor of a value
- `is.kind(value, constructor)` Find a constructor in a value's [prototype chain][1]
- `is.array(value)` Same as `Array.isArray`
- `is.asyncFunction(value)`
- `is.asyncIterable(value)` Returns true for objects returned by [`Symbol.asyncIterator`][2] functions
- `is.bigint(value)`
- `is.boolean(value)`
- `is.class(value)` Returns true for `class` functions (but not transpiled classes)
- `is.date(value)`
- `is.emptyObject(value)` Returns true for plain objects with no keys
- `is.error(value)`
- `is.generator(value)` Returns true for objects returned by [generator functions][3]
- `is.generatorFunction(value)`
- `is.function(value)`
- `is.infinite(value)`
- `is.integer(value)`
- `is.iterable(value)` Returns true for objects returned by [`Symbol.iterator`][4] functions
- `is.map(value)`
- `is.nan(value)` Same as `Number.isNaN`
- `is.null(value)`
- `is.number(value)` Returns true for any number (but never `NaN`)
- `is.object(value)` Returns true for any object or function (but never `null`)
- `is.plainObject(value)` Returns true for objects created by `{}`, `new Object`, or `Object.create(null)`
- `is.promise(value)`
- `is.promiseLike(value)` Returns true for objects with a `then` method
- `is.regExp(value)`
- `is.safeInteger(value)` Same as `Number.isSafeInteger`
- `is.set(value)`
- `is.string(value)`
- `is.symbol(value)`
- `is.undefined(value)`
- `is.weakMap(value)`
- `is.weakSet(value)`
