import { DropdownItem } from "reactstrap";
import {
  memo,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useReducer,
} from "react";
import PropTypes from "prop-types";
// import AddedContext from "../../components/ContextComponents/AddedContext";
// import { myContext } from "../../components/ContextComponents/AddedContext";
// const { itemsAdded } = AddedContext;
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {};
    default:
      break;
  }
  return state;
}

const initialState = {
  isAdded: false,
  myClass: "",
};

function SingleDropDown({ itemObj, itemsAdded, onAdd, clickHandler, myItems }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isAdded, myClass } = state;
  // console.log(itemsAdded);
  // const { itemsAdded, onAdd } = useContext(myContext);
  // console.log(itemsAdded);
  // const itemsAdded = useContext(AddedContext);
  // const renderCount = useRef(0);
  // console.log("SingleDropDown");
  // console.log(itemObj);

  // const clickHandler = useCallback(() => {
  //   return !itemsAdded.includes(itemObj) && onAdd(itemObj);
  // }, []);

  useEffect(() => {
    console.log("SingleDropDown");
    // renderCount.current = renderCount.current + 1;
    // console.log(renderCount.current);
  });
  return (
    <DropdownItem
      toggle={false}
      className={
        myItems.includes(itemObj) ? "text-decoration-line-through" : ""
      }
      // className={
      //   itemsAdded.includes(itemObj) ? "text-decoration-line-through" : ""
      // }
      // onClick={clickHandler}
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

// export default memo(SingleDropDown);
export default memo(
  SingleDropDown,
  (prev, next) => prev.myItems.length === next.myItems.length
);
