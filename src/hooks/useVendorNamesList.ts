import { shallowEqual } from "react-redux";
import { useAppSelector } from "../Redux/hooks";
import { selectVendorsArr } from "../Redux/selectors";
import type { VendorName } from "../types/api";

const useVendorNamesList = (): VendorName[] =>
  useAppSelector(selectVendorsArr, shallowEqual);

export default useVendorNamesList;
