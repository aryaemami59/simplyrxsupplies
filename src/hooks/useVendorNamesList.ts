import { shallowEqual } from "react-redux";

import { useAppSelector } from "../redux/hooks";
import { selectVendorsArray } from "../redux/selectors";
import type { VendorName } from "../types/aa";

const useVendorNamesList = (): VendorName[] =>
  useAppSelector(selectVendorsArray, shallowEqual);

export default useVendorNamesList;
