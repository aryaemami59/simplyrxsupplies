import { useAppSelector } from "../redux/hooks";
import { vendorsAdapterSelectors } from "../redux/selectors";
import { OfficialVendorName } from "../types/api";

const useOfficialVendorName = (vendorId: number): OfficialVendorName =>
  useAppSelector(
    state => vendorsAdapterSelectors.selectById(state, vendorId).officialName
  );

export default useOfficialVendorName;
