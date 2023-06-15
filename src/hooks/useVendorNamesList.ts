import { shallowEqual } from "react-redux";

import { useAppSelector } from "../redux/hooks";
import { selectVendorsArray } from "../redux/selectors";
import type { VendorName } from "../types/api";

const useVendorNamesList = (): VendorName[] =>
  useAppSelector(selectVendorsArray, shallowEqual);

export default useVendorNamesList;
