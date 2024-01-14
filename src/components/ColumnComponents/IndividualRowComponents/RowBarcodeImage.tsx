import type { FC } from "react"
import { memo } from "react"

import useItemId from "../../../hooks/useItemId"
import useVendorId from "../../../hooks/useVendorId"
import {
  useItemName,
  useItemNumber,
  useOfficialVendorName,
} from "../../../redux/selectors"
import BarcodeImage from "./BarcodeImage"
import RowBarcodeModal from "./ModalComponents/RowBarcodeModal"
import PrintBarcodeIcon from "./PrintBarcodeIcon"

const RowBarcodeImage: FC = () => {
  const vendorId = useVendorId()

  const itemId = useItemId()

  const officialVendorName = useOfficialVendorName(vendorId)

  const itemName = useItemName(itemId)

  const itemNumber = useItemNumber(itemId)

  const header = `<h2>Item Name: </h2><h1>${itemName}</h1><h2>Item Number: </h2><h1>${itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`

  return (
    <div className="my-1 container-fluid">
      <div className="row">
        <div className="col-md-12 position-relative">
          <div className="row justify-content-center">
            <PrintBarcodeIcon header={header} />
            <RowBarcodeModal />
          </div>
          <div className="row justify-content-center">
            <BarcodeImage className="w-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(RowBarcodeImage)
