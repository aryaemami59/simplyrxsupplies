import "vitest"

interface CustomMatchers<R = unknown> {
  toBeEmptyArray(): R
}

declare module "vitest" {
  interface Assertion<T> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
