import "vitest"

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Matchers<T = any> {
    toBeEmptyArray(): T
  }
}
