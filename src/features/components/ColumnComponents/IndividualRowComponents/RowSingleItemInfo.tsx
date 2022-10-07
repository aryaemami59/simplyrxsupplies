import { List } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import RowBarcodeImage from "./RowBarcodeImage";
import RowItemName from "./RowItemName";
import RowItemNumber from "./RowItemNumber";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowSingleItemInfo: FC<Props> = ({ itemObj, vendorName }) => {
  return (
    <div
      className="container"
      key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
      <List>
        <RowItemName
          itemObj={itemObj}
          vendorName={vendorName}
        />
        <RowItemNumber
          itemObj={itemObj}
          vendorName={vendorName}
        />
        <RowBarcodeImage
          itemObj={itemObj}
          vendorName={vendorName}
        />
      </List>
    </div>
  );
};

export default memo<Props>(RowSingleItemInfo);
