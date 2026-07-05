import type { ContextType } from "react"
import { use } from "react"
import { ItemIdContext } from "../contexts/ItemIdProvider.js"

/**
 * Reads the current {@linkcode ItemIdContext} value and asserts it is
 * non-null. Must be called inside a component tree that is wrapped with
 * {@linkcode ItemIdProvider}.
 *
 * @returns The current item ID from {@linkcode ItemIdContext}.
 * @throws An {@linkcode Error} when called outside of an {@linkcode ItemIdProvider}.
 */
export const useItemId = (): NonNullable<ContextType<typeof ItemIdContext>> => {
  const value = use(ItemIdContext)

  if (value == null) {
    throw new Error(
      `${useItemId.name} must be called within a <ItemIdProvider> component.`,
    )
  }

  return value
}
