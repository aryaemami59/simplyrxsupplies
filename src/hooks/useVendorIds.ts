import { useAppSelector } from "../redux/hooks";
import { vendorsAdapterSelectors } from "../redux/selectors";

const useVendorIds = (): number[] =>
  useAppSelector(vendorsAdapterSelectors.selectIds);

export default useVendorIds;
