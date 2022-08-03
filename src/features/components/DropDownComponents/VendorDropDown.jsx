import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
} from "reactstrap";
import SingleDropDown from "./SingleDropDown";
import PropTypes from "prop-types";
import {
  memo,
  useEffect,
  useState,
  useMemo,
  useContext,
  useReducer,
  useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  addItems,
  selectAllAddedNames,
  selectAllAdded,
  selectVendorAdded,
} from "../../../addedSlice";
// import { selectItemsByVendor } from "../../../itemsSlice";

// import { itemsContext } from "./VendorDropDownsList";
// import { AddedContext } from "../../../App";

// function reducer(state, action) {
//   switch (action.type) {
//     case "update": {
//       return {
//         ...state,
//         // dropdownOpen: false,
//         myItems: [...state.myItems],
//         dropdownOpen: !state.dropdownOpen,
//       };
//     }
//     case "open": {
//       return {
//         ...state,
//         dropdownOpen: false,
//       };
//     }
//     case "close": {
//       return {
//         ...state,
//         dropdownOpen: false,
//       };
//     }
//     default:
//       break;
//   }
//   return state;
// }

// const initialState = {
//   myItems: [],
//   dropdownOpen: false,
// };

// function updateItems(item, e) {
//   return item(e);
// }

function VendorDropDown({
  officialVendorName,
  items,
  vendorName,
  onAdd,
  // itemsAdded,
  // index,
  // bigItemsAdded,
}) {
  // const myItems = useSelector(selectItemsByVendor(vendorName));
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { myItems, dropdownOpen } = state;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const myItems = items.filter(e => e[vendorName]);
  const added = useSelector(selectAllAdded);
  const vendorAdded = useSelector(selectVendorAdded(vendorName));
  const myItemsAdded = added.filter(e => e[vendorName]);
  const dispatch = useDispatch();
  // const [myItems, setMyItems] = useState([]);
  // const [itemsAdded, setItemsAdded] = useState([]);
  const mm = [];
  // console.log(mm)

  const updateItemsAdded = () => {
    mm.length && dispatch(addItems(mm));
    // setItemsAdded(prev => [...prev, ...mm]);
  };

  const clickHandler = (e, data) => {
    !mm.includes(data) && mm.push(data);
  };
  // const toggle = useCallback(() => {
  //   return !dropdownOpen
  //     ? dispatch({ type: "update" })
  //     : dispatch({ type: "open" });
  // }, []);
  // console.log(itemsAdded);

  // const my = useMemo(() => {
  //   return myItems;
  // }, [myItems.length]);

  // useEffect(() => {
  //   // console.log(itemsAdded);
  // }, [itemsAdded]);

  // useEffect(() => {
  //   setMyItems(items.filter(e => e[vendorName]));
  //   // console.log(items);
  // }, [items, vendorName]);
  // const clickHandler = useCallback(e => {
  //   return !myItems.includes(e) && myItems.push(e);
  // }, []);
  // const clickHandler = e => {
  //   !myItems.includes(e) && myItems.push(e);
  // };
  // const add = useCallback(() => {
  //   if (my.length) {
  //     itemsAdded.push(...my);
  //     return onAdd(...itemsAdded);
  //   }
  // }, [my]);
  // add();
  // useEffect(() => {
  //   add();
  //   // if (my.length) {
  //   //   itemsAdded.push(...my);
  //   //   return onAdd(...itemsAdded);
  //   // }
  //   // if (my.length) {
  //   //   itemsAdded.push(...my);
  //   //   onAdd(...itemsAdded);
  //   // }
  //   // itemsAdded.push(myItems);
  // }, [my]);

  useEffect(() => {
    // console.log("VendorDropDown Mounts");
  }, []);

  useEffect(() => {
    console.log("VendorDropDown Renders");
  });
  // useEffect(() => {
  //   // console.log(myItems);
  // }, [myItems]);
  // const toggle = () => setDropdownOpen(prevState => !prevState);
  // const [added, setAdded] = useState(() => []);
  // const itemsAdded = useContext(itemsContext);
  // const itemsAdded = useContext(AddedContext);
  // console.log(itemsAdded)
  // const changeLen = useMemo(() => {
  //   return itemsAdded;
  // }, [itemsAdded]);
  // console.log("VendorDropDown");

  useEffect(() => {
    // console.log(mm);
    // console.log(itemsAdded);
    // console.log(items);
    // console.log("VendorDropDown");
  });
  // const addedStr = useMemo(() => {
  //   return itemsAdded.map(({ name }) => name).join();
  // }, [itemsAdded]);

  // const addedArr = useMemo(() => {
  //   return itemsAdded;
  // }, [addedStr]);

  // useEffect(() => {
  //   console.log("VendorDropDown changed");
  // }, [addedArr]);
  return (
    <>
      <Dropdown
        className="me-2"
        isOpen={dropdownOpen}
        // toggle={toggle}
        toggle={() => {
          setDropdownOpen(!dropdownOpen);
          updateItemsAdded();
        }}>
        <DropdownToggle caret>{officialVendorName}</DropdownToggle>
        <DropdownMenu dark>
          {myItems
            // .filter(e => e[vendorName])
            .map(e => (
              <SingleDropDown
                onAdd={onAdd}
                key={`${e.name}-${vendorName}`}
                itemObj={e}
                items={items}
                // myItemsAdded={myItemsAdded}
                vendorAdded={vendorAdded}
                // itemsAdded={itemsAdded}
                onClick={clickHandler}
              />
            ))}
          {/* {items
            .filter(e => e[vendorName])
            .map(e => (
              <SingleDropDown
                onAdd={onAdd}
                key={`${e.name}-${vendorName}`}
                itemObj={e}
                items={items}
                itemsAdded={itemsAdded}
              />
            ))} */}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

VendorDropDown.propTypes = {
  officialVendorName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  vendorName: PropTypes.string,
  onAdd: PropTypes.func,
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
};

export default memo(VendorDropDown);
// export default memo(
//   VendorDropDown,
//   (prev, next) => prev.itemsAdded.length === next.itemsAdded.length
// );
