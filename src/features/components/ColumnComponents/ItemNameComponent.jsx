import { ListGroup } from "react-bootstrap";
import { memo } from "react";
import CopyIconComponent from "./CopyIconComponent";
import { useAppSelector } from "../../../data/store";
const ItemNameComponent = ({ vendorName, itemObj }) => {
    const itemNameShown = useAppSelector((state) => state.added.showItemName);
    return (<>
      {itemNameShown ? (<ListGroup.Item action className="rounded-top fw-bold" variant="success" key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
          Item Name: {itemObj.name}
          <CopyIconComponent key={`${vendorName}-${itemObj.name}-CopyIconComponent-ItemNameComponent`} content={itemObj.name} text={"Name"} placement="top" itemObj={itemObj} vendorName={vendorName}/>
        </ListGroup.Item>) : ("")}
    </>);
};
export default memo(ItemNameComponent);
