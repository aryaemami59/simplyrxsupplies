import { Dropdown } from "react-bootstrap";
import { memo, useState, useCallback } from "react";
import SingleDropDown from "./SingleDropDown";
import { useSelector, shallowEqual } from "react-redux";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../addedSlice";
import PropTypes from "prop-types";

function VendorDropDown({ vendorName }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const officialVendorName = useSelector(selectVendorOfficialName(vendorName));
  const myItems = useSelector(selectItemsByVendor(vendorName), shallowEqual);

  const toggle = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  return (
    <Dropdown
      autoClose="outside"
      title={officialVendorName}
      show={dropdownOpen}
      onToggle={toggle}>
      <Dropdown.Toggle
        variant="dark"
        className={`btn ${dropdownOpen ? "btn-info text-white" : "text-info"}`}
        as="button">
        {officialVendorName}
      </Dropdown.Toggle>
      <Dropdown.Menu
        renderOnMount
        variant="dark"
        className="bg-dark border border-info"
        show={dropdownOpen}>
        {myItems.map(e => (
          <SingleDropDown
            key={`${e.name}-${vendorName}`}
            itemObj={e}
            vendorName={vendorName}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

VendorDropDown.propTypes = {
  vendorName: PropTypes.string,
};

export default memo(VendorDropDown);
