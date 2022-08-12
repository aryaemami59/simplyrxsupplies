import { memo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { addItems, checkIfItemAdded } from "../../../addedSlice";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";

function SingleDropDown({ itemObj, vendorName }) {
  const dispatch = useDispatch();
  const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));

  useEffect(() => {
    // console.log("dispatch changed");
  }, [dispatch]);

  useEffect(() => {
    // console.log("dropdown Mounts");
    // return () => console.log("dropdown Unmounts");
  }, []);

  const clickHandler = useCallback(() => {
    dispatch(addItems(itemObj));
  }, [dispatch, itemObj]);

  useEffect(() => {
    // console.log("clickHandler changed");
  }, [clickHandler]);

  useEffect(() => {
    // console.log("SingleDropDown");
  });

  return (
    <Dropdown.Item
      variant="dark"
      // toggle={false}
      className={ifAdded ? "text-decoration-line-through" : ""}
      onClick={clickHandler}>
      {itemObj.name}
    </Dropdown.Item>
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
