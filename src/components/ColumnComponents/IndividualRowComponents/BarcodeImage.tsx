import type { FC } from "react"
import { memo } from "react"
import { useItemId } from "../../../hooks/useItemId.js"
import { useItemName, useItemSrc } from "../../../redux/selectors.js"

type Props = {
  className?: string
}

const BarcodeImage: FC<Props> = ({ className }) => {
  const itemId = useItemId()
  const src = useItemSrc(itemId)
  const itemName = useItemName(itemId)

  return (
    <img
      alt={itemName}
      className={`${className ?? ""} barcode-image`}
      src={src}
    />
  )
}

export default memo<Props>(BarcodeImage)
