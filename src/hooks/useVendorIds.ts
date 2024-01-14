import { ADAPTER_SELECTORS } from "../redux/adapterSelectors"
import { useAppSelector } from "../redux/hooks"

const useVendorIds = (): number[] =>
  useAppSelector(ADAPTER_SELECTORS.GLOBAL.vendors.selectIds)

export default useVendorIds
