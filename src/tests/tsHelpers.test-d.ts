import type { IconButtonProps, InputAdornmentProps } from "@mui/material"
import type {
  DistributedOmit,
  DistributedPick,
  PropsWithRequiredChildren,
  PropsWithoutChildren,
  Simplify,
} from "../types/tsHelpers.js"

describe("tsHelpers type tests", () => {
  it("DistributedOmit", () => {
    expectTypeOf<DistributedOmit<InputAdornmentProps, "key">>().toEqualTypeOf<
      Omit<InputAdornmentProps, "key">
    >()
  })

  it("DistributedPick", () => {
    expectTypeOf<
      DistributedPick<InputAdornmentProps, "key" | "onClick">
    >().toEqualTypeOf<Pick<InputAdornmentProps, "key" | "onClick">>()
  })

  it("Simplify", () => {
    expectTypeOf<
      Simplify<
        IconButtonProps & {
          InputAdornmentProps: InputAdornmentProps
        }
      >
    >().branded.toEqualTypeOf<
      IconButtonProps & {
        InputAdornmentProps: InputAdornmentProps
      }
    >()

    expectTypeOf<
      Simplify<
        IconButtonProps & {
          InputAdornmentProps: InputAdornmentProps
        }
      >
    >().toExtend<
      IconButtonProps & {
        InputAdornmentProps: InputAdornmentProps
      }
    >()

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface SomeInterface {
      bar?: string
      baz: number | undefined
      foo: number
    }

    type SomeType = {
      bar?: string
      baz: number | undefined
      foo: number
    }

    const literal = {
      bar: "hello",
      baz: 456,
      foo: 123,
    } as const satisfies SomeType satisfies SomeInterface

    const someType: SomeType = literal
    const someInterface: SomeInterface = literal

    const fn = (object: Record<string, unknown>): void => {
      console.log(object)
    }

    fn(literal) // ✅ Good: literal object type is sealed
    fn(someType) // ✅ Good: type is sealed
    // @ts-expect-error
    fn(someInterface) // ❌ Error: Index signature for type 'string' is missing in type 'SomeInterface'. Because `interface` can be re-opened
    // @ts-expect-error ❌ Error: Index signature for type 'string' is missing in type 'SomeInterface'. Because `interface` can be re-opened
    expectTypeOf(fn).toBeCallableWith(someInterface)
    fn(someInterface as Simplify<SomeInterface>) // ✅ Good: transform an `interface` into a `type`
  })

  it("PropsWithoutChildren", () => {
    expectTypeOf<PropsWithoutChildren<InputAdornmentProps>>().toEqualTypeOf<
      PropsWithoutChildren<InputAdornmentProps>
    >()
  })

  it("PropsWithRequiredChildren", () => {
    expectTypeOf<
      PropsWithRequiredChildren<InputAdornmentProps>
    >().toEqualTypeOf<PropsWithRequiredChildren<InputAdornmentProps>>()
  })
})
