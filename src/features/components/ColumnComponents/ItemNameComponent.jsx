import { memo } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import CopyIconComponent from "./CopyIconComponent";
import PropTypes from "prop-types";

function ItemNameComponent({ vendorName, itemObj }) {
  return (
    <ListGroup.Item
      action
      variant="success"
      key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
      Item Name: {itemObj.name}
      <CopyIconComponent
        key={`${vendorName}-${itemObj.name}-CopyIconComponent-ItemNameComponent`}
        content={itemObj.name}
        text={"Name"}
        placement="right"
        itemObj={itemObj}
        vendorName={vendorName}
      />
    </ListGroup.Item>
  );
}

ItemNameComponent.propTypes = {
  vendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(ItemNameComponent);
