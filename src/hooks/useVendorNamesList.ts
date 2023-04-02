import { shallowEqual } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { selectVendorsArr } from "../redux/selectors";
import type { VendorName } from "../types/api";

const useVendorNamesList = (): VendorName[] =>
  useAppSelector(selectVendorsArr, shallowEqual);

export default useVendorNamesList;
