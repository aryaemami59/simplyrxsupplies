import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FC, memo } from "react";
// import { ListGroup } from "react-bootstrap";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import { useAppSelector } from "../../../../Redux/hooks";
import { RootState } from "../../../../Redux/store";
import CopyIcon from "./CopyIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowItemNumber: FC<Props> = ({ vendorName, itemObj }): JSX.Element => {
  const itemNumberShown = useAppSelector(
    (state: RootState) => state.added.showItemNumber
  );

  return (
    <>
      {itemNumberShown && (
        <ListItem
          divider
          // disablePadding
          key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
          <ListItemText>Item Number: {itemObj.itemNumber}</ListItemText>
          {/* <ListItemButton style={{ justifyContent: "flex-end" }}> */}
          <CopyIcon
            key={`${vendorName}-${itemObj.itemNumber}-CopyIconComponent-ItemNumberComponent`}
            content={itemObj.itemNumber}
            text={"Number"}
            placement="bottom"
            itemObj={itemObj}
            vendorName={vendorName}
          />
          {/* </ListItemButton> */}
        </ListItem>
      )}
    </>
  );
};

export default memo<Props>(RowItemNumber);
