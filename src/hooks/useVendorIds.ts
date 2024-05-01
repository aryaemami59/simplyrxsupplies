import { ADAPTER_SELECTORS } from "../redux/adapterSelectors"
import { useAppSelector } from "../redux/hooks"

export const useVendorIds = (): number[] =>
  useAppSelector(ADAPTER_SELECTORS.GLOBAL.vendors.selectIds)
