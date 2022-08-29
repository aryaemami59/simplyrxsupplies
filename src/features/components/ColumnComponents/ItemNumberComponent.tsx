import { ListGroup } from "react-bootstrap";
import { memo, FC } from "react";
import CopyIconComponent from "./CopyIconComponent";
import { useAppSelector, RootState } from "../../../data/store";
import { itemInterface } from "../../../addedSlice";

interface Prop {
  itemObj: itemInterface;
  vendorName: string;
}

const ItemNumberComponent: FC<Prop> = ({
  vendorName,
  itemObj,
}): JSX.Element => {
  const itemNumberShown = useAppSelector(
    (state: RootState) => state.added.showItemNumber
  );
  return (
    <>
      {itemNumberShown ? (
        <ListGroup.Item
          variant="primary"
          className="rounded-bottom fw-bold"
          action
          key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
          Item Number: {itemObj.itemNumber}
          <CopyIconComponent
            key={`${vendorName}-${itemObj.itemNumber}-CopyIconComponent-ItemNumberComponent`}
            content={itemObj.itemNumber}
            text={"Number"}
            placement="bottom"
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

export default memo(ItemNumberComponent);
