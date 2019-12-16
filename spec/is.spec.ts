import { is } from '../src/is'

const symbol = Symbol()
const object = { a: 1 }
const emptyObject = {}
const nullPrototype = Object.create(null)
const array = [1]
const emptyArray: any[] = []
const map = new Map()
const set = new Set()
const weakMap = new WeakMap()
const weakSet = new WeakSet()
const anonFn = function() {}
const namedFn = function foo() {}
const asyncFn = async function() {}
const arrowFn = () => {}
const asyncArrowFn = async () => {}
const generatorFn = function*() {}
const generator = generatorFn()
const asyncGeneratorFn = async function*() {}
const asyncGenerator = asyncGeneratorFn()
const arrayIterator = array[Symbol.iterator]()
const mapIterator = map[Symbol.iterator]()
const iterable = { [Symbol.iterator]: (): any => {} }
const asyncIterable = { [Symbol.asyncIterator]: (): any => {} }
const date = new Date()
const regExp = /./
const promise = Promise.resolve()
const promiseLike = { then: (): any => {} }
const classFunction = class {}
const classInstance = new classFunction()
const error = new Error()
const typeError = new TypeError()
const fraction = 0.5
const inf = [Infinity, -Infinity]
const safeInts = [0, 1, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
const unsafeInts = [Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 1]
const numbers = [fraction, ...safeInts, ...unsafeInts, ...inf]
const char = 'a'
const emptyString = ''

const values = [
  //
  // Primitives
  //
  undefined,
  null,
  true,
  false,
  NaN,
  // 10n, // bigint
  ...numbers,
  char,
  emptyString,
  symbol,
  //
  // Objects
  //
  object,
  emptyObject,
  nullPrototype,
  array,
  emptyArray,
  map,
  set,
  weakMap,
  weakSet,
  anonFn,
  namedFn,
  arrowFn,
  asyncFn,
  asyncArrowFn,
  generatorFn,
  generator,
  asyncGeneratorFn,
  asyncGenerator,
  arrayIterator,
  mapIterator,
  iterable,
  asyncIterable,
  date,
  regExp,
  promise,
  promiseLike,
  classFunction,
  classInstance,
  error,
  typeError,
]

test('is.what', () => {
  const names = values.map(is.what)
  expect(names).toMatchInlineSnapshot(`
    Array [
      "undefined",
      "null",
      "boolean",
      "boolean",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "string",
      "string",
      "symbol",
      "Object",
      "Object",
      "Object",
      "Array",
      "Array",
      "Map",
      "Set",
      "WeakMap",
      "WeakSet",
      "Function",
      "Function",
      "Function",
      "AsyncFunction",
      "AsyncFunction",
      "GeneratorFunction",
      "Generator",
      "Function",
      "Object",
      "Array Iterator",
      "Map Iterator",
      "Object",
      "Object",
      "Date",
      "RegExp",
      "Promise",
      "Object",
      "Function",
      "Object",
      "Error",
      "Error",
    ]
  `)
})

test('is.type', () => {
  expect(is.type({}, Object)).toBeTruthy()
  expect(is.type([], Object)).toBeFalsy()
  expect(is.kind([], Array)).toBeTruthy()
})

test('is.kind', () => {
  expect(is.kind({}, Object)).toBeTruthy()
  expect(is.kind([], Object)).toBeTruthy()
  expect(is.kind([], Function)).toBeFalsy()
})

//
// Type predicates
//

test('is.array', () => {
  expect(is.array).toMatchValues([array, emptyArray])
})

test('is.asyncFunction', () => {
  expect(is.asyncFunction).toMatchValues([asyncFn, asyncArrowFn])
})

test('is.asyncIterable', () => {
  expect(is.asyncIterable).toMatchValues([asyncIterable, asyncGenerator])
})

// TODO: uncomment this when Babel supports bigint
// test('is.bigint', () => {
//   expect(is.bigint).toMatchValues([])
// })

test('is.boolean', () => {
  expect(is.boolean).toMatchValues([true, false])
})

test('is.class', () => {
  expect(is.class).toMatchValues([classFunction])
})

test('is.date', () => {
  expect(is.date).toMatchValues([date])
})

test('is.defined', () => {
  const matches = is.defined(values)
  expect(matches).not.toContain(undefined)
  expect(matches).not.toEqual([])
})

test('is.emptyObject', () => {
  expect(is.emptyObject).toMatchValues([
    emptyObject,
    nullPrototype,
    iterable,
    asyncIterable,
  ])
})

test('is.error', () => {
  expect(is.error).toMatchValues([error, typeError])
})

test('is.function', () => {
  expect(is.function).toMatchValues([
    arrowFn,
    anonFn,
    namedFn,
    asyncFn,
    asyncArrowFn,
    classFunction,
    generatorFn,
    asyncGeneratorFn,
  ])
})

test('is.generator', () => {
  expect(is.generator).toMatchValues([generator])
})

test('is.generatorFunction', () => {
  expect(is.generatorFunction).toMatchValues([generatorFn])
})

test('is.infinite', () => {
  expect(is.infinite).toMatchValues([Infinity, -Infinity])
})

test('is.integer', () => {
  expect(is.integer).toMatchValues([...safeInts, ...unsafeInts])
})

test('is.iterable', () => {
  expect(is.iterable).toMatchValues([
    iterable,
    arrayIterator,
    mapIterator,
    generator,
    char,
    array,
    emptyArray,
    map,
    set,
  ])
})

test('is.map', () => {
  expect(is.map).toMatchValues([map])
})

test('is.nan', () => {
  expect(is.nan).toMatchValues([NaN])
})

test('is.null', () => {
  expect(is.null).toMatchValues([null])
})

test('is.number', () => {
  expect(is.number).toMatchValues(numbers)
})

test('is.safeInteger', () => {
  expect(is.safeInteger).toMatchValues(safeInts)
})

test('is.set', () => {
  expect(is.set).toMatchValues([set])
})

test('is.string', () => {
  expect(is.string).toMatchValues([emptyString, char])
})

test('is.symbol', () => {
  expect(is.symbol).toMatchValues([symbol])
})

test('is.undefined', () => {
  expect(is.undefined).toMatchValues([undefined])
})

test('is.weakMap', () => {
  expect(is.weakMap).toMatchValues([weakMap])
})

test('is.weakSet', () => {
  expect(is.weakSet).toMatchValues([weakSet])
})

expect.extend({
  toMatchValues(match: (value: any) => boolean, expected: any[]) {
    const matches = values.filter(match)
    for (const value of matches) {
      if (!expected.includes(value)) {
        return {
          pass: false,
          message: () =>
            'did not expect this value to match: ' +
            this.utils.stringify(value),
        }
      }
    }
    for (const value of expected) {
      if (!matches.includes(value)) {
        return {
          pass: false,
          message: () =>
            'expected this value to match: ' + this.utils.stringify(value),
        }
      }
    }
    return {
      pass: true,
      message: () =>
        'expected none of these values to match: ' +
        this.utils.stringify(expected),
    }
  },
})
