import { ListGroup } from "react-bootstrap";
import { memo, FC } from "react";
import CopyIconComponent from "./CopyIconComponent";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import { RootState } from "../../../Redux/store";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const ItemNumberComponent: FC<Props> = ({
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

export default memo<Props>(ItemNumberComponent);
