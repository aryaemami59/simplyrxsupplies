import { memo } from "react"
import { useQRCodeData } from "../../../hooks/useQRCodeData.js"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { useQRCodeText } from "../../../redux/selectors.js"

type Props = {
  readonly className?: string
}

const QRCodeImage = ({ className }: Props) => {
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

export default memo(QRCodeImage)
