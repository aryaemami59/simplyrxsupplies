import { ListItem } from "@mui/material";
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
          // variant="primary"
          className="rounded-bottom fw-bold"
          // action
          key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
          Item Number: {itemObj.itemNumber}
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
