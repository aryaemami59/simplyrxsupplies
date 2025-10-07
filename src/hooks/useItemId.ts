import { useContext } from "react"
import { ItemIdContext } from "../contexts/ItemIdProvider.js"

export const useItemId = () => useContext(ItemIdContext)
