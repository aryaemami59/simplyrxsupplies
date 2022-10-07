import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import { useAppSelector } from "../../../../Redux/hooks";
import { RootState } from "../../../../Redux/store";
import CopyIcon from "./CopyIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowItemName: FC<Props> = ({ vendorName, itemObj }) => {
  const itemNameShown = useAppSelector(
    (state: RootState) => state.added.showItemName
  );

  return (
    <>
      {itemNameShown && (
        <ListItem
          divider
          key={`${itemObj.id}-${vendorName}-VendorColumn-ListGroupItem-name`}>
          <ListItemText>Item Name: {itemObj.name}</ListItemText>
          <CopyIcon
            key={`${vendorName}-${itemObj.id}-CopyIconComponent-ItemNameComponent`}
            content={itemObj.name}
            text={"Name"}
            placement="top"
            itemObj={itemObj}
            vendorName={vendorName}
          />
        </ListItem>
      )}
    </>
  );
};

export default memo<Props>(RowItemName);
