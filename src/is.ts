const toString = /* @__PURE__ */ Object.prototype.toString

export type AsyncFunction<T = unknown> = (...args: any[]) => Promise<T>
export type Class<T = unknown> = new (...args: any[]) => T
export type EmptyObject = { [key: string]: never }
export type NativeObject = Function | readonly any[] | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any> | Promise<any> | Date | RegExp
export type PlainObject<T> = Exclude<T & { [key: string]: any }, NativeObject>

const isArray = /* @__PURE__ */ (() => Array.isArray as (value: unknown) => value is readonly any[])()
const isAsyncFunction = (value: unknown): value is AsyncFunction => getObjectType(value) === 'AsyncFunction'
const isAsyncIterable = (value: unknown): value is AsyncIterableIterator<unknown> => !!value && isFunction((value as any)[Symbol.asyncIterator])
const isBigint = /* @__PURE__ */ isOfType<bigint>('bigint')
const isBoolean = (value: unknown): value is boolean => value === true || value === false
const isClass = (value: unknown): value is Class => isFunction(value) && value.toString().startsWith('class ')
const isDate = /* @__PURE__ */ isObjectOfType<Date>('Date')
const isDefined = <T>(value: T): value is Exclude<T, void> => value !== undefined
const isError = /* @__PURE__ */ isObjectOfType<Error>('Error')
const isFunction = /* @__PURE__ */ isOfType<Function>('function')
const isGenerator = (value: unknown): value is Generator => isIterable(value) && isFunction(value.next) && isFunction(value.throw)
const isGeneratorFunction = /* @__PURE__ */ isObjectOfType<GeneratorFunction>('GeneratorFunction')
const isInfinite = (value: unknown): value is number => value === Infinity || value === -Infinity
const isInteger = (value: unknown): value is number => Number.isInteger(value as number)
const isIterable = (value: unknown): value is IterableIterator<unknown> => !!value && isFunction((value as any)[Symbol.iterator])
const isMap = /* @__PURE__ */ isObjectOfType<Map<unknown, unknown>>('Map')
const isNan = /* @__PURE__ */ (() => Number.isNaN)()
const isNull = (value: unknown): value is null => value === null
const isNumber = (value: unknown): value is number => isNumberLike(value) && !isNan(value)
const isNumberLike = /* @__PURE__ */ isOfType<number>('number')
const isObject = /* @__PURE__ */ isOfType<object>('object')
const isObjectOrFunction = (value: unknown): value is object => !!value && (isObject(value) || isFunction(value))
const isPromise = /* @__PURE__ */ isObjectOfType<Promise<unknown>>('Promise')
const isPromiseLike = (value: unknown): value is PromiseLike<unknown> => !!value && isFunction((value as any).then)
const isRegExp = /* @__PURE__ */ isObjectOfType<RegExp>('RegExp')
const isSafeInteger = /* @__PURE__ */ (() => Number.isSafeInteger as (value: unknown) => value is number)()
const isSet = /* @__PURE__ */ isObjectOfType<Set<unknown>>('Set')
const isString = /* @__PURE__ */ isOfType<string>('string')
const isSymbol = /* @__PURE__ */ isOfType<symbol>('symbol')
const isUndefined = /* @__PURE__ */ isOfType<undefined>('undefined')
const isWeakMap = /* @__PURE__ */ isObjectOfType<WeakMap<object, unknown>>('WeakMap')
const isWeakSet = /* @__PURE__ */ isObjectOfType<WeakSet<object>>('WeakSet')

const isPlainObject = <T>(value: T): value is PlainObject<T> => {
  if (getObjectType(value) !== 'Object') {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.getPrototypeOf({})
}

const isEmptyObject = (value: object): value is EmptyObject => {
  if (!isPlainObject(value)) return false
  for (const _ in value) return false
  return true
}

/**
 * Returns the type name of `value`
 */
export const isWhat = (value: unknown) =>
  value === null //
    ? 'null'
    : isObjectOrFunction(value)
    ? getObjectType(value) || 'Object'
    : typeof value

/**
 * Returns true if `value` was created by `constructor` and not by
 * a subclass of `constructor`.
 */
export const isType = <T>(value: unknown, constructor: Class<T>): value is T =>
  // Was `value` created by `constructor` and not a subclass of `constructor`?
  !!value && Object.getPrototypeOf(value) === constructor.prototype

/**
 * Returns true if `value` was created by `constructor` or a subclass
 * of `constructor`.
 */
export const isKind = <T>(value: unknown, constructor: Class<T>): value is T =>
  // Is `constructor` in the prototype chain of `value`?
  value instanceof constructor

export {
  isArray,
  isAsyncFunction,
  isAsyncIterable,
  isBigint,
  isBoolean,
  isClass,
  isDate,
  isDefined,
  isEmptyObject,
  isError,
  isGenerator,
  isGeneratorFunction,
  isFunction,
  isInfinite,
  isInteger,
  isIterable,
  isMap,
  isNan,
  isNull,
  isNumber,
  isObjectOrFunction as isObject,
  isPlainObject,
  isPromise,
  isPromiseLike,
  isRegExp,
  isSafeInteger,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  isWeakMap,
  isWeakSet,
}

export const is = /* @__PURE__ */ Object.freeze({
  array: isArray,
  asyncFunction: isAsyncFunction,
  asyncIterable: isAsyncIterable,
  bigint: isBigint,
  boolean: isBoolean,
  class: isClass,
  date: isDate,
  defined: isDefined,
  emptyObject: isEmptyObject,
  error: isError,
  generator: isGenerator,
  generatorFunction: isGeneratorFunction,
  function: isFunction,
  infinite: isInfinite,
  integer: isInteger,
  iterable: isIterable,
  map: isMap,
  nan: isNan,
  null: isNull,
  number: isNumber,
  object: isObjectOrFunction,
  plainObject: isPlainObject,
  promise: isPromise,
  promiseLike: isPromiseLike,
  regExp: isRegExp,
  safeInteger: isSafeInteger,
  set: isSet,
  string: isString,
  symbol: isSymbol,
  undefined: isUndefined,
  weakMap: isWeakMap,
  weakSet: isWeakSet,
})

function isOfType<T>(type: string) {
  return (value: unknown): value is T => typeof value === type
}

function isObjectOfType<T>(type: string) {
  return (value: unknown): value is T => getObjectType(value) === type
}

function getObjectType(value: unknown): string | undefined {
  const type = toString.call(value).slice(8, -1)
  if (type) {
    return type
  }
}
