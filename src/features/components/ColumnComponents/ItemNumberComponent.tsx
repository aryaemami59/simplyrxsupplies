import { ListGroup } from "react-bootstrap";
import { memo, FC } from "react";
import CopyIconComponent from "./CopyIconComponent";
import { useAppSelector, RootState } from "../../../data/store";
import { itemInterface } from "../../../addedSlice";

interface Props {
  itemObj: itemInterface;
  vendorName: string;
}

const ItemNumberComponent: FC<Props> = ({
  vendorName,
  itemObj,
}): JSX.Element => {
  const itemNumberShown: boolean = useAppSelector<boolean>(
    (state: RootState): boolean => state.added.showItemNumber
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

export default memo<Props>(ItemNumberComponent);
