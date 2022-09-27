import { ListGroup } from "react-bootstrap";
import { memo } from "react";
import CopyIconComponent from "./CopyIconComponent";
import { useAppSelector } from "../../../data/store";
const ItemNumberComponent = ({ vendorName, itemObj, }) => {
    const itemNumberShown = useAppSelector((state) => state.added.showItemNumber);
    return (<>
      {itemNumberShown ? (<ListGroup.Item variant="primary" className="rounded-bottom fw-bold" action key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
          Item Number: {itemObj.itemNumber}
          <CopyIconComponent key={`${vendorName}-${itemObj.itemNumber}-CopyIconComponent-ItemNumberComponent`} content={itemObj.itemNumber} text={"Number"} placement="bottom" itemObj={itemObj} vendorName={vendorName}/>
        </ListGroup.Item>) : ("")}
    </>);
};
export default memo(ItemNumberComponent);
