import { VendorNameContext } from "../contexts/VendorNameProvider";
import { useContext } from "react";

const useVendorName = () => useContext(VendorNameContext);

export default useVendorName;
