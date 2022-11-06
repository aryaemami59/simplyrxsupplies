import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../Redux/hooks";
import { selectVendorsArr } from "../../Redux/selectors";

const useVendorNamesList = () => useAppSelector(selectVendorsArr, shallowEqual);

export default useVendorNamesList;
