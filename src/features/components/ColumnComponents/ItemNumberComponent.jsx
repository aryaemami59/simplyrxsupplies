import { ListGroup } from "react-bootstrap";
import { memo } from "react";
import CopyIconComponent from "./CopyIconComponent";
import PropTypes from "prop-types";

function ItemNumberComponent({ vendorName, itemObj }) {
  return (
    <ListGroup.Item
      variant="primary"
      className="rounded-bottom"
      action
      key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
      Item Number: {itemObj.itemNumber}
      <CopyIconComponent
        key={`${vendorName}-${itemObj.itemNumber}-CopyIconComponent-ItemNumberComponent`}
        content={itemObj.itemNumber}
        text={"Number"}
        placement="right"
        itemObj={itemObj}
        vendorName={vendorName}
      />
    </ListGroup.Item>
  );
}

ItemNumberComponent.propTypes = {
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

export default memo(ItemNumberComponent);
