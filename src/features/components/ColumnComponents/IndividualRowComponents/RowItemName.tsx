import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemName, VendorNameType } from "../../../../customTypes/types";
import CopyIcon from "./CopyIcon";

type Props = {
  itemName: ItemName;
  vendorName: VendorNameType;
};

const RowItemName: FC<Props> = ({ itemName, vendorName }) => (
  <ListItem divider>
    <ListItemText>Item Name: {itemName}</ListItemText>
    <CopyIcon
      content={itemName}
      text={"Name"}
    />
  </ListItem>
);

export default memo<Props>(RowItemName);
