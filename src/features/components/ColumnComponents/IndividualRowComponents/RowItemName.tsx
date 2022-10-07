import { ListItem, ListItemButton, ListItemText } from "@mui/material";
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
          // disablePadding
          key={`${itemObj.id}-${vendorName}-VendorColumn-ListGroupItem-name`}>
          <ListItemText>Item Name: {itemObj.name}</ListItemText>
          {/* <ListItemButton style={{ justifyContent: "flex-end" }}> */}
          <CopyIcon
            key={`${vendorName}-${itemObj.id}-CopyIconComponent-ItemNameComponent`}
            content={itemObj.name}
            text={"Name"}
            placement="top"
            itemObj={itemObj}
            vendorName={vendorName}
          />
          {/* </ListItemButton> */}
        </ListItem>
      )}
    </>
  );
};

export default memo<Props>(RowItemName);
