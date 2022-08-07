import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import SingleDropDown from "./SingleDropDown";
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";

function VendorDropDown({ officialVendorName, items, vendorName }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const myItems = items.filter(e => e[vendorName]);

  useEffect(() => {
    //   // console.log("VendorDropDown");
  });

  return (
    <Dropdown
      className="me-2"
      isOpen={dropdownOpen}
      toggle={() => {
        setDropdownOpen(!dropdownOpen);
      }}>
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
