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

isWhat(0) // 'number'
isWhat({}) // 'Object'

//
// Check the constructor of a value.
//

isType(0, Number) // true
isType({}, Object) // true
isType([], Object) // false

//
// Find a constructor in a value's prototype chain.
//

isKind([], Object) // true

//
// Check if the value is a specific type.
//

isNumber(0) // true
isArray([]) // true
```

**See the tests for expected behavior.** They are very readable, just search for `test(`
to jump between the tests of each `is.` function.

## API

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator

- `isWhat(value)` Get the type name of a value
- `isType(value, constructor)` Check the constructor of a value
- `isKind(value, constructor)` Find a constructor in a value's [prototype chain][1]
- `isArray(value)` Same as `Array.isArray`
- `isAsyncFunction(value)`
- `isAsyncIterable(value)` Returns true for objects returned by [`Symbol.asyncIterator`][2] functions
- `isBigint(value)`
- `isBoolean(value)`
- `isClass(value)` Returns true for `class` functions (but not transpiled classes)
- `isDate(value)`
- `isDefined(value)` The opposite of `isUndefined`
- `isEmptyObject(value)` Returns true for plain objects with no keys
- `isError(value)`
- `isGenerator(value)` Returns true for objects returned by [generator functions][3]
- `isGeneratorFunction(value)`
- `isFunction(value)`
- `isInfinite(value)`
- `isInteger(value)`
- `isIterable(value)` Returns true for objects returned by [`Symbol.iterator`][4] functions
- `isMap(value)`
- `isNan(value)` Same as `Number.isNaN`
- `isNull(value)`
- `isNumber(value)` Returns true for any number (but never `NaN`)
- `isObject(value)` Returns true for any object or function (but never `null`)
- `isPlainObject(value)` Returns true for objects created by `{}`, `new Object`, or `Object.create(null)`
- `isPromise(value)`
- `isPromiseLike(value)` Returns true for objects with a `then` method
- `isRegExp(value)`
- `isSafeInteger(value)` Same as `Number.isSafeInteger`
- `isSet(value)`
- `isString(value)`
- `isSymbol(value)`
- `isUndefined(value)`
- `isWeakMap(value)`
- `isWeakSet(value)`
