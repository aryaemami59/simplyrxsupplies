import { useContext } from "react";

import { QRCodeDataContext } from "../contexts/QRCodeDataProvider";

const useQRCodeData = () => useContext(QRCodeDataContext);

export default useQRCodeData;
