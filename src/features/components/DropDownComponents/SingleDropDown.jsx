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
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { addItems } from "../../../addedSlice";
import { connect } from "react-redux";
import vendorAbbr from "../../../data/vendorAbbr.json";

function SingleDropDown({
  itemObj,
  itemsAdded,
  onAdd,
  onClick,
  myItems,
  myItemsAdded,
  vendorAdded,
  vendorName,
  addItems,
  addedItems,
  vendors,
}) {
  // const dispatch = useDispatch();
  // const [myClass, setMyClass] = useState("");
  // console.log(addedItems.includes(itemObj));
  // const vendorsArr = itemObj.vendors.map(e => vendorAbbr[e]);
  // console.log(vendors)
  // console.log(vendorsArr);


  function clickHandler() {
    // addItems();
    !addedItems.includes(itemObj) && addItems();
    // dispatch(addItems(itemObj));
    // onClick(e, itemObj);
    // !vendorAddedNames.includes(itemObj.name) &&
    //   setMyClass("text-decoration-line-through");
    // !added.includes(itemObj.name) && dispatch(addItems(itemObj));
    // (!vendorAddedNames.includes(itemObj.name) && onClick(e, itemObj)) ||
    //   setMyClass("text-decoration-line-through");
    // vendorAddedNames.includes(itemObj.name) &&
    //   setMyClass("text-decoration-line-through");
    // !isAdded && dispatch({ type: "add" });
  }
  // const clickHandler = useCallback(() => {
  //   return !itemsAdded.includes(itemObj) && onAdd(itemObj);
  // }, []);

  useEffect(() => {
    // itemsAdded.includes(itemObj) && dispatch({ type: "add" });
    // return () => itemsAdded.includes(itemObj) && dispatch({ type: "add" });
  }, [itemObj, itemsAdded]);

  useEffect(() => {
    // console.log("SingleDropDown");
    // console.log(renderCount.current);
  });
  return (
    <DropdownItem
      toggle={false}
      // className={myClass}
      // className={}
      className={
        addedItems.includes(itemObj) ? "text-decoration-line-through" : ""
      }
      // className={
      //   itemsAdded.includes(itemObj) ? "text-decoration-line-through" : ""
      // }
      // onClick={clickHandler}
      // onClick={e => clickHandler(e, itemObj)}
      onClick={clickHandler}
      // onClick={e => clickHandler(e, itemObj)}
    >
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
          vendors: ownProps.vendors
        })
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  memo(SingleDropDown, (prev, next) => {
    return !next.addedItems.includes(next.itemObj);
  })
);

// export default memo(SingleDropDown);
// export default memo(
//   SingleDropDown,
//   (prev, next) => prev.itemsAdded.length === next.itemsAdded.length
// );
