import { shallowEqual } from "react-redux";

import { useAppSelector } from "../redux/hooks";
import { selectItemNamesByVendor } from "../redux/selectors";
import type { VendorName } from "../types/api";

const useItemNames = (vendorName: VendorName): string[] =>
  useAppSelector(selectItemNamesByVendor(vendorName), shallowEqual);

export default useItemNames;
