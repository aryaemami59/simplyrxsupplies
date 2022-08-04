import { DropdownItem } from "reactstrap";
import {
  memo,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useReducer,
  useState,
} from "react";
import PropTypes from "prop-types";
import { addItems } from "../../../addedSlice";
import { connect } from "react-redux";

function SingleDropDown({ itemObj, addItems, addedItems }) {
  function clickHandler() {
    !addedItems.includes(itemObj) && addItems();
  }
  // console.log(addedItems);

  useEffect(() => {
    console.log("SingleDropDown");
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

const mapStateToProps = (state, ownProps) => {
  return {
    addedItems: state.added[ownProps.vendorName],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addItems: () =>
      dispatch(
        addItems({
          itemObj: ownProps.itemObj,
          vendorName: ownProps.vendorName,
          vendors: ownProps.vendors,
        })
      ),
  };
};

export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    memo(SingleDropDown, (prev, next) => {
      return !next.addedItems.includes(next.itemObj);
    })
  ),
  (prev, next) => {
    // console.log(prev);
  }
);
