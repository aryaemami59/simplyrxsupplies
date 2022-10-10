import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { VendorAndItemName } from "../../../../../customTypes/types";
import CopyIcon from "../CopyIcon";

// type Props = {
//   itemObj: ItemObjType;
//   vendorName: VendorNameType;
// };
type Props = VendorAndItemName;

const ModalItemName: FC<Props> = ({ itemName, vendorName }) => (
  <ListItem
    divider
    key={`${itemName}-${vendorName}-VendorColumn-ListGroupItem-name`}>
    <ListItemText>Item Name: {itemName}</ListItemText>
    <CopyIcon
      key={`${vendorName}-${itemName}-CopyIconComponent-ItemNameComponent`}
      content={itemName}
      text={"Name"}
      // itemName={itemName}
      // vendorName={vendorName}
    />
  </ListItem>
);

export default memo<Props>(ModalItemName);
