import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import SingleDropDown from "./SingleDropDown";
import PropTypes from "prop-types";
import { memo, useEffect, useState, useRef, useMemo, useCallback } from "react";

function VendorDropDown({ officialVendorName, items, vendorName }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const renders = useRef(0);
  // console.log("renders:", renders.current++);

  const myItems = useMemo(() => {
    return items.filter(e => e[vendorName]);
  }, [items, vendorName]);

  const toggle = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  useEffect(() => {
    // console.log("my items changed");
  }, [myItems]);

  useEffect(() => {
    // console.log("toggle changed");
  }, [toggle]);

  useEffect(() => {
    // console.log("setDropdownOpen changed");
  }, [setDropdownOpen]);

  useEffect(() => {
    // console.log("dropdownOpen changed");
  }, [dropdownOpen]);

  useEffect(() => {
    // console.log("VendorDropDown Mounts");
    // return () => console.log("VendorDropDown Unmounts");
  }, []);

  useEffect(() => {
    //   // console.log("VendorDropDown");
  });

  return (
    <Dropdown
      className="me-2 d-none d-lg-inline-block"
      isOpen={dropdownOpen}
      toggle={toggle}>
      <DropdownToggle caret>{officialVendorName}</DropdownToggle>
      <DropdownMenu dark>
        {myItems.map(e => (
          <SingleDropDown
            key={`${e.name}-${vendorName}`}
            itemObj={e}
            items={items}
            vendorName={vendorName}
            vendors={e.vendors}
          />
        ))}
      </DropdownMenu>
    </Dropdown>
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
