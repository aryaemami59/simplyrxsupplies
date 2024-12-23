import type { FC } from "react"
import { memo } from "react"

import { useQRCodeData } from "../../../hooks/useQRCodeData"
import { useVendorId } from "../../../hooks/useVendorId"
import { useQRCodeText } from "../../../redux/selectors"

type Props = {
  className?: string
}

const QRCodeImage: FC<Props> = ({ className }) => {
  const vendorId = useVendorId()
  const title = useQRCodeText(vendorId)
  const qrCodeData = useQRCodeData()

  return (
    <img
      alt={`${vendorId.toString()} QRCode`}
      className={className ?? ""}
      src={qrCodeData}
      title={title}
    />
  )
}

export default memo<Props>(QRCodeImage)
