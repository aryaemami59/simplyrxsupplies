import { useContext } from "react"

import { ItemIdContext } from "../contexts/ItemIdProvider"

const useItemId = () => useContext(ItemIdContext)

export default useItemId
