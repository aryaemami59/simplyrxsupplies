import { shallowEqual } from "react-redux";
import type { VendorNameType } from "../custom_types/api";
import { useAppSelector } from "../Redux/hooks";
import { selectItemNamesByVendor } from "../Redux/selectors";

const useItemNames = (vendorName: VendorNameType) =>
  useAppSelector(selectItemNamesByVendor(vendorName), shallowEqual);

export default useItemNames;
