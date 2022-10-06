import { FC, memo } from "react";
import {
  ItemObjType,
  officialVendorNameType,
} from "../../../../../customTypes/types";
import PrintBarcodeIcon from "../PrintBarcodeIcon";
import RowBarcodeModal from "./RowBarcodeModal";

type Props = {
  itemObj: ItemObjType;
  officialVendorName: officialVendorNameType;
};

const ModalBarcodeContainer: FC<Props> = ({
  itemObj,
  officialVendorName,
}): JSX.Element => {
  return (
    <div className="my-4 container-fluid">
      <div className="row">
        <div className="position-relative col col-md-12">
          <div className="justify-content-center row">
            <PrintBarcodeIcon
              itemObj={itemObj}
              text={"Print This Barcode"}
              header={`<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemObj.itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`}
            />
            <RowBarcodeModal itemObj={itemObj} />
          </div>
          <div className="justify-content-center row">
            <img
              src={itemObj.src}
              alt={itemObj.itemNumber}
              className="custom-shadow my-4 w-auto p-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(ModalBarcodeContainer);
