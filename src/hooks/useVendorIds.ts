import { useAppSelector } from "../redux/hooks";
import { globalizedSelectors } from "../redux/selectors";

const useVendorIds = (): number[] =>
  useAppSelector(globalizedSelectors.vendors.selectIds);

export default useVendorIds;
