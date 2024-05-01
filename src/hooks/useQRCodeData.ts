import { useContext } from "react"

import { QRCodeDataContext } from "../contexts/QRCodeDataProvider"

export const useQRCodeData = () => useContext(QRCodeDataContext)
