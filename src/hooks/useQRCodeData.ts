import { useContext } from "react"
import { QRCodeDataContext } from "../contexts/QRCodeDataProvider.js"

export const useQRCodeData = () => useContext(QRCodeDataContext)
