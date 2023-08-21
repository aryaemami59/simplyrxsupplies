import { useContext } from "react";

import { VendorIdContext } from "../contexts/VendorIdProvider";

const useVendorId = () => useContext(VendorIdContext);

export default useVendorId;
