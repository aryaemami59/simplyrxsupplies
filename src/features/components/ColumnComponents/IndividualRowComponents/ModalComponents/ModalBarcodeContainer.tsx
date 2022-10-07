import { FC, memo } from "react";
import {
  ItemObjType,
  officialVendorNameType,
} from "../../../../../customTypes/types";
import BarcodeImage from "../BarcodeImage";
import PrintBarcodeIcon from "../PrintBarcodeIcon";
import RowBarcodeModal from "./RowBarcodeModal";

type Props = {
  itemObj: ItemObjType;
  officialVendorName: officialVendorNameType;
};

const ModalBarcodeContainer: FC<Props> = ({ itemObj, officialVendorName }) => {
  const header = `<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemObj.itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`;

  return (
    <div className="my-4 container-fluid">
      <div className="row">
        <div className="position-relative col col-md-12">
          <div className="justify-content-center row">
            <PrintBarcodeIcon
              itemObj={itemObj}
              text={"Print This Barcode"}
              header={header}
            />
            <RowBarcodeModal itemObj={itemObj} />
          </div>
          <div className="justify-content-center row">
            <BarcodeImage itemObj={itemObj} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(ModalBarcodeContainer);
