import PropTypes from "prop-types"
import type { FC } from "react"
import { memo } from "react"

import { useItemId } from "../../../hooks/useItemId"
import { useItemName, useItemSrc } from "../../../redux/selectors"

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

BarcodeImage.defaultProps = {
  className: undefined,
}

BarcodeImage.propTypes = {
  className: PropTypes.string,
}

export default memo<Props>(BarcodeImage)
