import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import CopyIcon from "../CopyIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
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
