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

const RowItemName: FC<Props> = ({ vendorName, itemObj }): JSX.Element => {
  const itemNameShown = useAppSelector(
    (state: RootState) => state.added.showItemName
  );

  return (
    <>
      {itemNameShown && (
        <ListItem
          // action
          className="rounded-top fw-bold"
          // variant="success"
          key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
          Item Name: {itemObj.name}
          <CopyIcon
            key={`${vendorName}-${itemObj.name}-CopyIconComponent-ItemNameComponent`}
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
