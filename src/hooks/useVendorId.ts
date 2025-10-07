import { useContext } from "react"
import { VendorIdContext } from "../contexts/VendorIdProvider.js"

export const useVendorId = () => useContext(VendorIdContext)
