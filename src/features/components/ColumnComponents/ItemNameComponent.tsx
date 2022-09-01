import { ListGroup } from "react-bootstrap";
import { memo, FC } from "react";
import CopyIconComponent from "./CopyIconComponent";
import { useAppSelector, RootState } from "../../../data/store";
import { itemInterface } from "../../../addedSlice";

interface Props {
  itemObj: itemInterface;
  vendorName: string;
}

const ItemNameComponent: FC<Props> = ({ vendorName, itemObj }): JSX.Element => {
  const itemNameShown: boolean = useAppSelector<boolean>(
    (state: RootState): boolean => state.added.showItemName
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
