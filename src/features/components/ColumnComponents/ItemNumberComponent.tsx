import { ListGroup } from "react-bootstrap";
import { memo } from "react";
import CopyIconComponent from "./CopyIconComponent";
import PropTypes from "prop-types";
import { useAppSelector, RootState } from "../../../data/store";

function ItemNumberComponent({ vendorName, itemObj }) {
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
