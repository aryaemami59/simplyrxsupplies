import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import { useAppSelector } from "../../../../Redux/hooks";
import CopyIcon from "./CopyIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowItemNumber: FC<Props> = ({ vendorName, itemObj }) => {
  const itemNumberShown = useAppSelector(state => state.added.showItemNumber);

  return (
    <>
      {itemNumberShown && (
        <ListItem divider>
          <ListItemText>Item Number: {itemObj.itemNumber}</ListItemText>
          <CopyIcon
            content={itemObj.itemNumber}
            text={"Number"}
            itemObj={itemObj}
            vendorName={vendorName}
          />
        </ListItem>
      )}
    </>
  );
};

export default memo<Props>(RowItemNumber);
