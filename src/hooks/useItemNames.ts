import { shallowEqual } from "react-redux";

import { useAppSelector } from "../redux/hooks";
import { selectItemNamesByVendor } from "../redux/selectors";
import type { ItemName, VendorName } from "../types/api";

const useItemNames = (vendorName: VendorName): ItemName[] =>
  useAppSelector(selectItemNamesByVendor(vendorName), shallowEqual);

export default useItemNames;
