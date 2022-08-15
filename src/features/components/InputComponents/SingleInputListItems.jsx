import { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import officialVendorNames from "../../../data/officialVendorNames.json";
import BarcodeImageComponent from "./BarcodeImageComponent";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

function SingleInputListItems({ itemObj }) {
  const dispatch = useDispatch();

  const vendors = useSelector(state => state.item[itemObj.name]);
  // console.log(vendors);

  // const [checked, setChecked] = useState(true);

  // const clickHandler1 = useCallback(() => {
  //   setChecked(prev => !prev);
  // }, []);

  const clickHandler = useCallback(() => {
    dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors]);

  return (
    <div>
      <button
        key={`${itemObj.name}-badge`}
        onClick={clickHandler}
        className="btn btn-success d-block w-100">
        Item Name: {itemObj.name}
        {/* {vendors.map(e => (
          <VendorBadges
            vendors={vendors}
            key={`${e}-${itemObj.name}-badge`}
            itemObj={itemObj}
            vendorName={e}
            officialVendorName={officialVendorNames[e]}
          />
        ))} */}
        <BarcodeImageComponent
          itemNumber={itemObj.itemNumber}
          src={itemObj.src}
          key={`${itemObj.name}-BarcodeImageComponent-inputListItem`}
        />
      </button>
      <div key={`Container-`}>
        {itemObj.vendors.map(e => (
          <VendorBadges
            vendors={itemObj.vendors}
            key={`${e}-${itemObj.name}-badge`}
            itemObj={itemObj}
            vendorName={e}
            officialVendorName={officialVendorNames[e]}
          />
        ))}
      </div>
    </div>
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

// const mapStateToProps = (state, ownProps) => {
//   return {
//     myVendors: state.item[ownProps.itemObj.name],
//   };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     clickHandler: () => {
//       dispatch(
//         addItems({
//           itemObj: ownProps.itemObj,
//           vendors: ownProps.myVendors,
//         })
//       );
//     },
//   };
// };

// export default memo(
//   connect(mapStateToProps, mapDispatchToProps)(SingleInputListItems)
// );
export default memo(SingleInputListItems);
