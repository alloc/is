const { toString } = Object.prototype

export type AsyncFunction<T = unknown> = (...args: any[]) => Promise<T>
export type Class<T = unknown> = new (...args: any[]) => T
export type EmptyObject = { [key: string]: never }
export type NativeObject = Function | readonly any[] | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any> | Promise<any> | Date | RegExp
export type PlainObject<T> = Exclude<T & { [key: string]: any }, NativeObject>

const isArray = Array.isArray as (value: unknown) => value is readonly any[]
const isAsyncFunction = (value: unknown): value is AsyncFunction => getObjectType(value) === 'AsyncFunction'
const isAsyncIterable = (value: unknown): value is AsyncIterableIterator<unknown> => !!value && isFunction((value as any)[Symbol.asyncIterator])
const isBigint = isOfType<bigint>('bigint')
const isBoolean = (value: unknown): value is boolean => value === true || value === false
const isClass = (value: unknown): value is Class => isFunction(value) && value.toString().startsWith('class ')
const isDate = isObjectOfType<Date>('Date')
const isDefined = <T>(value: T): value is Exclude<T, void> => value !== undefined
const isError = isObjectOfType<Error>('Error')
const isFunction = isOfType<Function>('function')
const isGenerator = (value: unknown): value is Generator => isIterable(value) && isFunction(value.next) && isFunction(value.throw)
const isGeneratorFunction = isObjectOfType<GeneratorFunction>('GeneratorFunction')
const isInfinite = (value: unknown): value is number => value === Infinity || value === -Infinity
const isInteger = (value: unknown): value is number => Number.isInteger(value as number)
const isIterable = (value: unknown): value is IterableIterator<unknown> => !!value && isFunction((value as any)[Symbol.iterator])
const isMap = isObjectOfType<Map<unknown, unknown>>('Map')
const isNaN = Number.isNaN
const isNull = (value: unknown): value is null => value === null
const isNumber = isOfType<number>('number')
const isObject = isOfType<object>('object')
const isObjectOrFunction = (value: unknown): value is object => !!value && (isObject(value) || isFunction(value))
const isPromise = isObjectOfType<Promise<unknown>>('Promise')
const isPromiseLike = (value: unknown): value is PromiseLike<unknown> => !!value && isFunction((value as any).then)
const isRegExp = isObjectOfType<RegExp>('RegExp')
const isSet = isObjectOfType<Set<unknown>>('Set')
const isString = isOfType<string>('string')
const isSymbol = isOfType<symbol>('symbol')
const isUndefined = isOfType<undefined>('undefined')
const isWeakMap = isObjectOfType<WeakMap<object, unknown>>('WeakMap')
const isWeakSet = isObjectOfType<WeakSet<object>>('WeakSet')

const isPlainObject = <T>(value: T): value is PlainObject<T> => {
  if (getObjectType(value) !== 'Object') {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

const isEmptyObject = (value: object): value is EmptyObject => {
  if (!isPlainObject(value)) return false
  for (const _ in value) return false
  return true
}

/**
 * Returns the type name of `value`
 */
const getType = (value: unknown) =>
  value === null //
    ? 'null'
    : isObjectOrFunction(value)
    ? getObjectType(value) || 'Object'
    : typeof value

/**
 * Returns true if `value` was created by `constructor` and not by
 * a subclass of `constructor`.
 */
const isType = <T>(value: unknown, constructor: Class<T>): value is T =>
  // Was `value` created by `constructor` and not a subclass of `constructor`?
  !!value && Object.getPrototypeOf(value) === constructor.prototype

/**
 * Returns true if `value` was created by `constructor` or a subclass
 * of `constructor`.
 */
const isKind = <T>(value: unknown, constructor: Class<T>): value is T =>
  // Is `constructor` in the prototype chain of `value`?
  value instanceof constructor

export const is = Object.freeze({
  what: getType,
  type: isType,
  kind: isKind,
  //
  // Type predicates
  //
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
  nan: isNaN,
  null: isNull,
  number: (value: unknown): value is number => isNumber(value) && !isNaN(value),
  object: isObjectOrFunction,
  plainObject: isPlainObject,
  promise: isPromise,
  promiseLike: isPromiseLike,
  regExp: isRegExp,
  safeInteger: Number.isSafeInteger as (value: unknown) => value is number,
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
