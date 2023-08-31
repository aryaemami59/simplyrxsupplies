import { useAppSelector } from "../redux/hooks";
import { selectOfficialName } from "../redux/selectors";
import type { OfficialVendorName } from "../types/api";

const useOfficialVendorName = (vendorId: number): OfficialVendorName =>
  useAppSelector(state => selectOfficialName(state, vendorId));

export default useOfficialVendorName;
