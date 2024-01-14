import PropTypes from "prop-types"
import type { FC } from "react"
import { memo } from "react"

import useQRCodeData from "../../../hooks/useQRCodeData"
import useVendorId from "../../../hooks/useVendorId"
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
      alt={`${vendorId} QRCode`}
      className={className ?? ""}
      src={qrCodeData}
      title={title}
    />
  )
}

QRCodeImage.defaultProps = {
  className: undefined,
}

QRCodeImage.propTypes = {
  className: PropTypes.string,
}

export default memo<Props>(QRCodeImage)
