import { useAppSelector } from "../redux/hooks";
import { vendorsAdapterSelectors } from "../redux/selectors";

const useItemIds = (vendorId: number): number[] =>
  useAppSelector(
    state => vendorsAdapterSelectors.selectById(state, vendorId).itemIds
  );

export default useItemIds;
