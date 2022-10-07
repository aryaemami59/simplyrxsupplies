import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
// import { ListGroup } from "react-bootstrap";
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
        <ListItem
          divider
          key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
          <ListItemText>Item Number: {itemObj.itemNumber}</ListItemText>
          <CopyIcon
            key={`${vendorName}-${itemObj.itemNumber}-CopyIconComponent-ItemNumberComponent`}
            content={itemObj.itemNumber}
            text={"Number"}
            placement="bottom"
            itemObj={itemObj}
            vendorName={vendorName}
          />
        </ListItem>
      )}
    </>
  );
};

export default memo<Props>(RowItemNumber);
