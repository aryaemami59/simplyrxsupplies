import { use } from "react"
import { QRCodeDataContext } from "../contexts/QRCodeDataProvider.js"

export const useQRCodeData = () => use(QRCodeDataContext)
