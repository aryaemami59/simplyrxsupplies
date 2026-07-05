import type { ContextType } from "react"
import { use } from "react"
import { VendorIdContext } from "../contexts/VendorIdProvider.js"

/**
 * Reads the current {@linkcode VendorIdContext} value and asserts it is
 * non-null. Must be called inside a component tree that is wrapped with
 * {@linkcode VendorIdProvider}.
 *
 * @returns The current vendor ID from {@linkcode VendorIdContext}.
 * @throws An {@linkcode Error} when called outside of a {@linkcode VendorIdProvider}.
 */
export const useVendorId = (): NonNullable<
  ContextType<typeof VendorIdContext>
> => {
  const value = use(VendorIdContext)

  if (value == null) {
    throw new Error(
      `${useVendorId.name} must be called within a <VendorIdProvider> component.`,
    )
  }

  return value
}
