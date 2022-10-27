import { FC, memo } from "react";
import { useAppSelector } from "../../../../Redux/hooks";
import { selectItemNumber } from "../../../../Redux/selectors";
import useItemName from "../../../customHooks/useItemName";
import useOfficialVendorName from "../../../customHooks/useOfficialVendorName";
import useVendorName from "../../../customHooks/useVendorName";
import BarcodeImage from "./BarcodeImage";
import RowBarcodeModal from "./ModalComponents/RowBarcodeModal";
import PrintBarcodeIcon from "./PrintBarcodeIcon";

const RowBarcodeImage: FC = () => {
  const vendorName = useVendorName();
  const itemName = useItemName();
  const officialVendorName = useOfficialVendorName(vendorName);

  const itemNumber = useAppSelector(selectItemNumber(itemName));

  const header = `<h2>Item Name: </h2><h1>${itemName}</h1><h2>Item Number: </h2><h1>${itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`;

  return (
    <div className="my-4 container-fluid">
      <div className="row">
        <div className="col-md-12 position-relative">
          <div className="row justify-content-center">
            <PrintBarcodeIcon
              text="Print This Barcode"
              header={header}
            />
            <RowBarcodeModal />
          </div>
          <div className="row justify-content-center">
            <BarcodeImage className="w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(RowBarcodeImage);
