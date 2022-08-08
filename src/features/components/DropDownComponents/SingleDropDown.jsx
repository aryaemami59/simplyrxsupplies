import { DropdownItem } from "reactstrap";
import { memo, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  addItems,
  selectByVendor,
  selectByVendorsNotAdded,
} from "../../../addedSlice";
// import { connect } from "react-redux";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

function SingleDropDown({ itemObj, vendorName, vendors }) {
  // const dispatchRef = useDispatch();
  const dispatch = useDispatch();

  const notAddedVendors = useSelector(
    selectByVendorsNotAdded(vendors, itemObj),
    shallowEqual
  );

  // const dispatch = useMemo(() => {
  //   return dispatchRef;
  // }, []);

  // const dispatch = useCallback(() => {
  //   dispatchRef(addItems({ itemObj, notAddedVendors }));
  // }, []);

  const addedItems = useSelector(selectByVendor(vendorName), (prev, next) => {
    return prev.includes(itemObj) || !next.includes(itemObj);
  });

  useEffect(() => {
    // console.log("dispatch changed");
  }, [dispatch]);

  useEffect(() => {
    // console.log("addedItems changed");
  }, [addedItems]);

  useEffect(() => {
    // console.log("dropdown Mounts");
    // return () => console.log("dropdown Unmounts");
  }, []);

  const clickHandler = useCallback(() => {
    notAddedVendors.length && dispatch(addItems({ itemObj, notAddedVendors }));
  }, [dispatch, itemObj, notAddedVendors]);

  useEffect(() => {
    // console.log("clickHandler changed");
  }, [clickHandler]);

  // function clickHandler() {
  //   !addedItems.includes(itemObj) && dispatch(addItems({ itemObj, vendors }));
  // }

  useEffect(() => {
    // console.log("SingleDropDown");
  });

  return (
    <DropdownItem
      toggle={false}
      className={
        addedItems.includes(itemObj) ? "text-decoration-line-through" : ""
      }
      onClick={clickHandler}>
      {itemObj.name}
    </DropdownItem>
  );
}

SingleDropDown.propTypes = {
  onAdd: PropTypes.func,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
  }),
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     addedItems: state.added[ownProps.vendorName],
//   };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     addItems: () =>
//       dispatch(
//         addItems({
//           itemObj: ownProps.itemObj,
//           vendorName: ownProps.vendorName,
//           vendors: ownProps.vendors,
//         })
//       ),
//   };
// };

export default memo(SingleDropDown);

// export default memo(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(
//     memo(SingleDropDown, (prev, next) => {
//       return !next.addedItems.includes(next.itemObj);
//     })
//   ),
//   (prev, next) => {
//     // console.log(prev);
//   }
// );
