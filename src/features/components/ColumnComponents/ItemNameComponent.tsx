import { ListGroup } from "react-bootstrap";
import { memo, FC } from "react";
import CopyIconComponent from "./CopyIconComponent";
import { useAppSelector, RootState } from "../../../data/store";
import { itemInterface } from "../../../addedSlice";

interface Prop {
  itemObj: itemInterface;
  vendorName: string;
}

const ItemNameComponent: FC<Prop> = ({ vendorName, itemObj }): JSX.Element => {
  const itemNameShown = useAppSelector(
    (state: RootState) => state.added.showItemName
  );

  return (
    <>
      {itemNameShown ? (
        <ListGroup.Item
          action
          className="rounded-top fw-bold"
          variant="success"
          key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
          Item Name: {itemObj.name}
          <CopyIconComponent
            key={`${vendorName}-${itemObj.name}-CopyIconComponent-ItemNameComponent`}
            content={itemObj.name}
            text={"Name"}
            placement="top"
            itemObj={itemObj}
            vendorName={vendorName}
          />
        </ListGroup.Item>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(ItemNameComponent);
