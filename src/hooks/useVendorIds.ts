import { ADAPTER_SELECTORS } from "../redux/adapterSelectors.js"
import { useAppSelector } from "../redux/hooks.js"

export const useVendorIds = (): number[] =>
  useAppSelector(ADAPTER_SELECTORS.GLOBAL.vendors.selectIds)
