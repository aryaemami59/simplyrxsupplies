import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, VendorNameType } from "../../../../../customTypes/types";
import CopyIcon from "../CopyIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: VendorNameType;
};

const ModalItemNumber: FC<Props> = ({ itemObj, vendorName }) => (
  <ListItem divider>
    <ListItemText>Item Number: {itemObj.itemNumber}</ListItemText>
    <CopyIcon
      content={itemObj.itemNumber}
      text={"Number"}
      itemObj={itemObj}
      vendorName={vendorName}
    />
  </ListItem>
);

export default memo<Props>(ModalItemNumber);
