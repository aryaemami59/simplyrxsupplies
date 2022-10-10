import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { VendorAndItemName } from "../../../../customTypes/types";
import CopyIcon from "./CopyIcon";

// type Props = {
//   itemObj: ItemObjType;
//   vendorName: VendorNameType;
// };
type Props = VendorAndItemName;

const RowItemName: FC<Props> = ({ vendorName, itemName }) => (
  <>
    {/* {itemNameShown && ( */}
    <ListItem divider>
      <ListItemText>Item Name: {itemName}</ListItemText>
      <CopyIcon
        content={itemName}
        text={"Name"}
        // itemName={itemName}
        // vendorName={vendorName}
      />
    </ListItem>
    {/* )} */}
  </>
);

export default memo<Props>(RowItemName);
