import { shallowEqual } from "react-redux";
import { useAppSelector } from "../Redux/hooks";
import { selectItemNamesByVendor } from "../Redux/selectors";
import type { VendorNameType } from "../types/api";

const useItemNames = (vendorName: VendorNameType) =>
  useAppSelector(selectItemNamesByVendor(vendorName), shallowEqual);

export default useItemNames;
