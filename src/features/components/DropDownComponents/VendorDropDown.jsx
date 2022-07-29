import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Dropdown,
} from "reactstrap";
import SingleDropDown from "./SingleDropDown";
import PropTypes from "prop-types";
import { memo, useEffect, useState, useMemo, useContext } from "react";
// import { itemsContext } from "./VendorDropDownsList";
// import { AddedContext } from "../../../App";

function VendorDropDown({
  officialVendorName,
  items,
  vendorName,
  onAdd,
  itemsAdded,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
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
                itemsAdded={itemsAdded}
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
