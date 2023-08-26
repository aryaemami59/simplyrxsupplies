import { useAppSelector } from "../redux/hooks";
import { selectVendorItemIds } from "../redux/selectors";

const useItemIds = (vendorId: number): number[] =>
  useAppSelector(state => selectVendorItemIds(state, vendorId));

export default useItemIds;
