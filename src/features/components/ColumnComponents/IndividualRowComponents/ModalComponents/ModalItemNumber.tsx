import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import CopyIcon from "../CopyIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const ModalItemNumber: FC<Props> = ({ itemObj, vendorName }) => {
  return (
    <ListItem
      divider
      key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
      <ListItemText>Item Number: {itemObj.itemNumber}</ListItemText>
      <CopyIcon
        key={`${vendorName}-${itemObj.itemNumber}-CopyIconComponent-ItemNameComponent`}
        content={itemObj.itemNumber}
        text={"Number"}
        placement="top"
        itemObj={itemObj}
        vendorName={vendorName}
      />
    </ListItem>
  );
};

export default memo<Props>(ModalItemNumber);
