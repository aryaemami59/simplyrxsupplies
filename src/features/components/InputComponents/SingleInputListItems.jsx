import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import officialVendorNames from "../../../data/officialVendorNames.json";
import BarcodeImageComponent from "./BarcodeImageComponent";
import PropTypes from "prop-types";

function SingleInputListItems({ itemObj, vendors }) {
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    dispatch(addItems(itemObj));
  }, [dispatch, itemObj]);

  return (
    <button
      key={`${itemObj.name}-badge`}
      onClick={clickHandler}
      className="btn btn-success d-block w-100">
      Item Name: {itemObj.name}
      {vendors.map(e => (
        <div key={`${e}-vendorBadges-container`}>
          <VendorBadges
            vendors={vendors}
            key={`${e}-${itemObj.name}-badge`}
            itemObj={itemObj}
            vendorName={e}
            officialVendorName={officialVendorNames[e]}
          />
        </div>
      ))}
      <BarcodeImageComponent
        itemNumber={itemObj.itemNumber}
        src={itemObj.src}
        key={`${itemObj.name}-BarcodeImageComponent-inputListItem`}
      />
    </button>
  );
}

SingleInputListItems.propTypes = {
  vendors: PropTypes.arrayOf(PropTypes.string),
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SingleInputListItems);
