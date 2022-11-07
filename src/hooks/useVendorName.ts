import { useContext } from "react";
import { VendorNameContext } from "../contexts/VendorNameProvider";

const useVendorName = () => useContext(VendorNameContext);

export default useVendorName;
