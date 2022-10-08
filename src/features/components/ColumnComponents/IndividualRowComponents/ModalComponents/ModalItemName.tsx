import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import CopyIcon from "../CopyIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const ModalItemName: FC<Props> = ({ itemObj, vendorName }) => (
  <ListItem
    divider
    key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
    <ListItemText>Item Name: {itemObj.name}</ListItemText>
    <CopyIcon
      key={`${vendorName}-${itemObj.name}-CopyIconComponent-ItemNameComponent`}
      content={itemObj.name}
      text={"Name"}
      itemObj={itemObj}
      vendorName={vendorName}
    />
  </ListItem>
);

export default memo<Props>(ModalItemName);
