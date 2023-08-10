import { useAppSelector } from "../redux/hooks";
import { selectVendorOfficialName } from "../redux/selectors";
import type { VendorName } from "../types/aa";

const useOfficialVendorName = (vendorName: VendorName) =>
  useAppSelector(selectVendorOfficialName(vendorName));

export default useOfficialVendorName;
