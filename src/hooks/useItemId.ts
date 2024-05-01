import { useContext } from "react"

import { ItemIdContext } from "../contexts/ItemIdProvider"

export const useItemId = () => useContext(ItemIdContext)
