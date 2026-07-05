import { ADAPTER_SELECTORS } from "../redux/adapterSelectors.js"
import { useAppSelector } from "../redux/hooks.js"

/**
 * Selects the list of all vendor IDs from the Redux store using the globalized
 * vendor entity adapter selector.
 *
 * @returns An array of numeric vendor IDs.
 */
export const useVendorIds = (): number[] =>
  useAppSelector(ADAPTER_SELECTORS.GLOBAL.vendors.selectIds)
