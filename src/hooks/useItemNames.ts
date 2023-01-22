import { shallowEqual } from "react-redux";
import { useAppSelector } from "../Redux/hooks";
import { selectItemNamesByVendor } from "../Redux/selectors";
import type { ItemName, VendorName } from "../types/api";

const useItemNames = (vendorName: VendorName): ItemName[] =>
  useAppSelector(selectItemNamesByVendor(vendorName), shallowEqual);

export default useItemNames;
