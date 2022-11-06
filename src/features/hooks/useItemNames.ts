import { shallowEqual } from "react-redux";
import { VendorNameType } from "../../custom_types/types";
import { useAppSelector } from "../../Redux/hooks";
import { selectItemNamesByVendor } from "../../Redux/selectors";

const useItemNames = (vendorName: VendorNameType) =>
  useAppSelector(selectItemNamesByVendor(vendorName), shallowEqual);

export default useItemNames;
