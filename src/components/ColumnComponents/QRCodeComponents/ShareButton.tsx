import { faShareNodes } from "@fortawesome/free-solid-svg-icons/faShareNodes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IosShareIcon from "@mui/icons-material/IosShare"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useCallback, useMemo, useState } from "react"
import { shareOnMobile } from "react-mobile-share"
import { useQRCodeData } from "../../../hooks/useQRCodeData.js"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { useCartItemNamesStringified } from "../../../redux/selectors.js"

const startIcon = /ipad|iphone|ipod/iu.test(navigator.userAgent) ? (
  <IosShareIcon fontSize="large" />
) : (
  <FontAwesomeIcon icon={faShareNodes} />
)

export const ShareButton = () => {
  const [open, setOpen] = useState(false)
  const vendorId = useVendorId()

  const itemNamesStringified = useCartItemNamesStringified(vendorId)
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

  const showTooltip = useCallback(() => {
    setOpen(true)
  }, [])

  const hideTooltip = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      onClose={hideTooltip}
      onOpen={showTooltip}
      open={open}
      role="tooltip"
      title="Share QR Code"
    >
      <IconButton
        className="d-inline-block w-auto"
        onClick={clickHandler}
        size="large"
      >
        {startIcon}
      </IconButton>
    </Tooltip>
  )
}
