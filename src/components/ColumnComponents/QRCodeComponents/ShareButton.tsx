import { faShareNodes } from "@fortawesome/free-solid-svg-icons/faShareNodes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IosShareIcon from "@mui/icons-material/IosShare"
import IconButton from "@mui/material/IconButton"
import type { FC } from "react"
import { memo, useCallback, useMemo } from "react"
import { shareOnMobile } from "react-mobile-share"

import { useQRCodeData } from "../../../hooks/useQRCodeData"
import { useVendorId } from "../../../hooks/useVendorId"
import { useCartItemNamesStringified } from "../../../redux/selectors"

const startIcon = /ipad|iphone|ipod/iu.test(navigator.userAgent) ? (
  <IosShareIcon fontSize="large" />
) : (
  <FontAwesomeIcon icon={faShareNodes} />
)

const ShareButton: FC = () => {
  const vendorId = useVendorId()
  const itemNamesStringified = useCartItemNamesStringified(vendorId)
  // const text = itemNames.join(", ");
  const title = `QR Code for items:\n${itemNamesStringified}`
  const qrCodeData = useQRCodeData()

  const data = useMemo(
    () =>
      ({
        title,
        images: [qrCodeData ?? ""],
        text: itemNamesStringified,
      }) satisfies Parameters<typeof shareOnMobile>[0],
    [itemNamesStringified, qrCodeData, title],
  )

  const clickHandler = useCallback(() => {
    shareOnMobile(data)
  }, [data])

  return (
    <IconButton
      className="d-inline-block w-auto"
      onClick={clickHandler}
      size="large"
    >
      {startIcon}
    </IconButton>
  )
}

export default memo(ShareButton)
