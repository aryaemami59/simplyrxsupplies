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

const ItemNameComponent: FC<Props> = ({ vendorName, itemObj }): JSX.Element => {
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

export default memo<Props>(ItemNameComponent);
