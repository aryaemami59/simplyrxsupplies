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
import { useDispatch } from "react-redux";
import {
  addItems,
  selectAllAddedNames,
  selectAllAdded,
} from "../../../addedSlice";
import { useSelector } from "react-redux";
// import AddedContext from "../../components/ContextComponents/AddedContext";
// import { myContext } from "../../components/ContextComponents/AddedContext";
// const { itemsAdded } = AddedContext;
// function reducer(state, action) {
//   switch (action.type) {
//     case "add": {
//       return {
//         isAdded: true,
//         myClass: "text-decoration-line-through",
//       };
//     }
//     default:
//       break;
//   }
//   return state;
// }

// const initialState = {
//   isAdded: false,
//   myClass: "",
// };

function SingleDropDown({
  itemObj,
  itemsAdded,
  onAdd,
  onClick,
  myItems,
  myItemsAdded,
  vendorAdded,
}) {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const dispatch = useDispatch();
  // const added = useSelector(selectAllAdded).filter((e) => e[vendor]);
  const vendorAddedNames = vendorAdded.map(({ name }) => name);
  // console.log(vendorAddedNames);
  const [myClass, setMyClass] = useState("");

  useEffect(() => {
    vendorAddedNames.includes(itemObj.name) &&
      setMyClass("text-decoration-line-through");
  }, [itemObj.name, vendorAddedNames]);
  // console.log(added);

  // const { isAdded, myClass } = state;
  // console.log(itemsAdded);
  // const { itemsAdded, onAdd } = useContext(myContext);
  // console.log(itemsAdded);
  // const itemsAdded = useContext(AddedContext);
  // const renderCount = useRef(0);
  // console.log("SingleDropDown");
  // console.log(itemObj);

  function clickHandler(e) {
    // !vendorAddedNames.includes(itemObj.name) &&
    //   setMyClass("text-decoration-line-through");
    // !added.includes(itemObj.name) && dispatch(addItems(itemObj));
    (!vendorAddedNames.includes(itemObj.name) && onClick(e, itemObj)) ||
      setMyClass("text-decoration-line-through");
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
    // renderCount.current = renderCount.current + 1;
    // console.log(renderCount.current);
  });
  return (
    <DropdownItem
      toggle={false}
      className={myClass}
      // className={}
      // className={
      //   myItems.includes(itemObj) ? "text-decoration-line-through" : ""
      // }
      // className={
      //   itemsAdded.includes(itemObj) ? "text-decoration-line-through" : ""
      // }
      // onClick={clickHandler}
      onClick={e => clickHandler(e, itemObj)}>
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

export default memo(SingleDropDown);
// export default memo(
//   SingleDropDown,
//   (prev, next) => prev.itemsAdded.length === next.itemsAdded.length
// );
