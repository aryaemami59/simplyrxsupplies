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
// import { itemsContext } from "./VendorDropDownsList";
// import { AddedContext } from "../../../App";

function reducer(state, action) {
  switch (action.type) {
    case "update": {
      return {
        ...state,
        // dropdownOpen: false,
        myItems: [...state.myItems],
        dropdownOpen: !state.dropdownOpen,
      };
    }
    case "open": {
      return {
        ...state,
        dropdownOpen: false,
      };
    }
    case "close": {
      return {
        ...state,
        dropdownOpen: false,
      };
    }
    default:
      break;
  }
  return state;
}

const initialState = {
  myItems: [],
  dropdownOpen: false,
};

function VendorDropDown({
  officialVendorName,
  items,
  vendorName,
  onAdd,
  itemsAdded,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { dropdownOpen, myItems } = state;
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = useCallback(() => {
    return !dropdownOpen
      ? dispatch({ type: "open" })
      : dispatch({ type: "update" });
  }, []);

  const my = useMemo(() => {
    return myItems;
  }, [myItems.length]);

  // const clickHandler = useCallback(e => {
  //   return !myItems.includes(e) && myItems.push(e);
  // }, []);
  const clickHandler = e => {
    !myItems.includes(e) && myItems.push(e);
  };

  useEffect(() => {
    console.log(myItems);
  }, [myItems]);
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
      <Dropdown className="me-2" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{officialVendorName}</DropdownToggle>
        <DropdownMenu dark>
          {items
            .filter(e => e[vendorName])
            .map(e => (
              <SingleDropDown
                onAdd={onAdd}
                key={`${e.name}-${vendorName}`}
                itemObj={e}
                items={items}
                // itemsAdded={itemsAdded}
                myItems={my}
                // itemsAdded={my}
                clickHandler={() => clickHandler(e)}
                // itemsAdded={changeLen}
                // itemsAdded={addedArr}
              />
            ))}
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

// export default memo(VendorDropDown);
export default memo(
  VendorDropDown,
  (prev, next) => prev.itemsAdded.length === next.itemsAdded.length
);
