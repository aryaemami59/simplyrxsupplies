import { FC, memo } from "react";
import {
  ItemName,
  OfficialVendorNameType,
} from "../../../../../customTypes/types";
import { selectItemNumber } from "../../../../../Redux/selectors";
import { useAppSelector } from "../../../../../Redux/hooks";
import BarcodeImage from "../BarcodeImage";
import PrintBarcodeIcon from "../PrintBarcodeIcon";
import RowBarcodeModal from "./RowBarcodeModal";

type Props = {
  itemName: ItemName;
  officialVendorName: OfficialVendorNameType;
};

const ModalBarcodeContainer: FC<Props> = ({ itemName, officialVendorName }) => {
  const itemNumber = useAppSelector(selectItemNumber(itemName));

  const header = `<h2>Item Name: </h2><h1>${itemName}</h1><h2>Item Number: </h2><h1>${itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`;

  return (
    <div className="my-4 container-fluid">
      <div className="row">
        <div className="position-relative col col-md-12">
          <div className="justify-content-center row">
            <PrintBarcodeIcon
              itemName={itemName}
              text={"Print This Barcode"}
              header={header}
            />
            <RowBarcodeModal itemName={itemName} />
          </div>
          <div className="justify-content-center row">
            <BarcodeImage itemName={itemName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(ModalBarcodeContainer);
