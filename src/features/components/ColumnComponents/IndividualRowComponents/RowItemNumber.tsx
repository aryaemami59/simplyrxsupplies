import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import {
  VendorAndItemName
} from "../../../../customTypes/types";
import { selectItemNumber } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";
import CopyIcon from "./CopyIcon";

// type Props = {
//   itemObj: ItemObjType;
//   vendorName: VendorNameType;
// };

type Props = VendorAndItemName;

const RowItemNumber: FC<Props> = ({ vendorName, itemName }) => {
  // const itemNumberShown = useAppSelector(state => state.added.showItemNumber);
  const itemNumber = useAppSelector(selectItemNumber(itemName));

  return (
    <>
      {/* {itemNumberShown && ( */}
      <ListItem divider>
        <ListItemText>Item Number: {itemNumber}</ListItemText>
        <CopyIcon
          content={itemNumber}
          text={"Number"}
          // itemName={itemName}
          // vendorName={vendorName}
        />
      </ListItem>
      {/* )} */}
    </>
  );
};

export default memo<Props>(RowItemNumber);
