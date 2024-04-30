/* eslint-disable @typescript-eslint/no-shadow, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions */
import type { Assertion, AsymmetricMatchersContaining } from "vitest"

interface CustomMatchers<R = unknown> {
  toBeEmptyArray(): R
}

declare module "vitest" {
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
