import { VendorNameType } from "../../customTypes/types";
import { useAppSelector } from "../../Redux/hooks";
import { selectVendorOfficialName } from "../../Redux/selectors";

const useOfficialVendorName = (vendorName: VendorNameType) =>
  useAppSelector(selectVendorOfficialName(vendorName));

export default useOfficialVendorName;
