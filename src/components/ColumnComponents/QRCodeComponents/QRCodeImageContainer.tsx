import type { FC } from "react"
import { memo } from "react"
import QRCodeDataProvider from "../../../contexts/QRCodeDataProvider.js"
import { useVendorId } from "../../../hooks/useVendorId.js"
import CollapseAllButton from "./CollapseAllButton.js"
import ExpandAllButton from "./ExpandAllButton.js"
import PrintIconQRCode from "./PrintIconQRCode.js"
import QRCodeImage from "./QRCodeImage.js"
import QRCodeModal from "./QRCodeModal.js"
import RemoveAllButton from "./RemoveAllButton.js"
import ShareButton from "./ShareButton.js"

const QRCodeImageContainer: FC = () => {
  const vendorId = useVendorId()
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="position-relative col-md-12">
          <QRCodeDataProvider vendorId={vendorId}>
            <div className="justify-content-center row">
              <PrintIconQRCode />
              <QRCodeModal />
              <RemoveAllButton />
              <CollapseAllButton />
              <ExpandAllButton />
              <ShareButton />
            </div>
            <div className="justify-content-center row">
              <QRCodeImage className="w-auto" />
            </div>
          </QRCodeDataProvider>
        </div>
      </div>
    </div>
  )
}

export default memo(QRCodeImageContainer)
