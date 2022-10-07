import { FC, memo } from "react";
import { ListGroup } from "react-bootstrap";
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import CopyIcon from "../CopyIcon";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const ModalItemName: FC<Props> = ({ itemObj, vendorName }) => {
  return (
    <ListGroup.Item
      action
      className="rounded-top fw-bold"
      variant="success"
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
    </ListGroup.Item>
  );
};

export default memo<Props>(ModalItemName);
