import { useContext } from "react"
import { ItemIdContext } from "../contexts/ItemIdProvider.js"

export const useItemId = () => {
  const value = useContext(ItemIdContext)

  if (value == null) {
    throw new Error(
      `${useItemId.name} must be called within a <ItemIdProvider> component.`,
    )
  }

  return value
}
