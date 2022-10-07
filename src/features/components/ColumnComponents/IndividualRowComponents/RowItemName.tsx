import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import { useAppSelector } from "../../../../Redux/hooks";
import CopyIcon from "./CopyIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowItemName: FC<Props> = ({ vendorName, itemObj }) => {
  const itemNameShown = useAppSelector(state => state.added.showItemName);

  return (
    <>
      {itemNameShown && (
        <ListItem divider>
          <ListItemText>Item Name: {itemObj.name}</ListItemText>
          <CopyIcon
            content={itemObj.name}
            text={"Name"}
            itemObj={itemObj}
            vendorName={vendorName}
          />
        </ListItem>
      )}
    </>
  );
};

export default memo<Props>(RowItemName);
