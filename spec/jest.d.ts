declare namespace jest {
  interface Matchers<R, T> {
    toMatchValues<E extends any[]>(expected: E): R
  }
}
