import { useQRCodeData } from "../../../hooks/useQRCodeData.js"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { useQRCodeText } from "../../../redux/selectors.js"

type Props = {
  /**
   * @default ""
   */
  readonly className?: string
}

export const QRCodeImage = ({ className = "" }: Props) => {
  const vendorId = useVendorId()

  const title = useQRCodeText(vendorId)

  const qrCodeData = useQRCodeData()

  return (
    <img
      alt={`${vendorId.toString()} QR Code`}
      className={className}
      src={qrCodeData}
      title={title}
    />
  )
}
