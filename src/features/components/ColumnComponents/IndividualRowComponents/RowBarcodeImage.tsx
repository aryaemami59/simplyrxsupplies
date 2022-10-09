import { FC, memo } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import { selectVendorOfficialName } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";
import BarcodeImage from "./BarcodeImage";
import RowBarcodeModal from "./ModalComponents/RowBarcodeModal";
import PrintBarcodeIcon from "./PrintBarcodeIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowBarcodeImage: FC<Props> = ({ itemObj, vendorName }) => {
  // const itemBarcodeShown = useAppSelector(state => state.added.showItemBarcode);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const header = `<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemObj.itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`;

  return (
    <>
      {/* {itemBarcodeShown && ( */}
        <div className="my-4 container-fluid">
          <div className="row">
            <div className="col-md-12 position-relative">
              <div className="row justify-content-center">
                <PrintBarcodeIcon
                  itemObj={itemObj}
                  text="Print This Barcode"
                  header={header}
                />
                <RowBarcodeModal itemObj={itemObj} />
              </div>
              <div className="row justify-content-center">
                <BarcodeImage
                  itemObj={itemObj}
                  className="w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default memo<Props>(RowBarcodeImage);
