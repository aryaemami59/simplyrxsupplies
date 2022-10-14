import { FC, memo } from "react";
import { VendorAndItemName } from "../../../../customTypes/types";
import {
  selectItemNumber,
  selectVendorOfficialName,
} from "../../../../Redux/selectors";
import { useAppSelector } from "../../../../Redux/hooks";
import BarcodeImage from "./BarcodeImage";
import RowBarcodeModal from "./ModalComponents/RowBarcodeModal";
import PrintBarcodeIcon from "./PrintBarcodeIcon";

type Props = VendorAndItemName;

const RowBarcodeImage: FC<Props> = ({ itemName, vendorName }) => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const itemNumber = useAppSelector(selectItemNumber(itemName));

  const header = `<h2>Item Name: </h2><h1>${itemName}</h1><h2>Item Number: </h2><h1>${itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`;

  return (
    <div className="my-4 container-fluid">
      <div className="row">
        <div className="col-md-12 position-relative">
          <div className="row justify-content-center">
            <PrintBarcodeIcon
              itemName={itemName}
              text="Print This Barcode"
              header={header}
            />
            <RowBarcodeModal itemName={itemName} />
          </div>
          <div className="row justify-content-center">
            <BarcodeImage
              itemName={itemName}
              className="w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(RowBarcodeImage);
