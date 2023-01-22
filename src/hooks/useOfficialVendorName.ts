import { useAppSelector } from "../Redux/hooks";
import { selectVendorOfficialName } from "../Redux/selectors";
import type { VendorName } from "../types/api";

const useOfficialVendorName = (vendorName: VendorName) =>
  useAppSelector(selectVendorOfficialName(vendorName));

export default useOfficialVendorName;
