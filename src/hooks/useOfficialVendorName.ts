import { useAppSelector } from "../Redux/hooks";
import { selectVendorOfficialName } from "../Redux/selectors";
import type { VendorNameType } from "../types/api";

const useOfficialVendorName = (vendorName: VendorNameType) =>
  useAppSelector(selectVendorOfficialName(vendorName));

export default useOfficialVendorName;
