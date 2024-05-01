import { useContext } from "react"

import { VendorIdContext } from "../contexts/VendorIdProvider"

export const useVendorId = () => useContext(VendorIdContext)
