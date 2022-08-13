import SingleDropDown from "./SingleDropDown";
import PropTypes from "prop-types";
import { memo, useState, useMemo, useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-bootstrap";

function VendorDropDown({ officialVendorName, items, vendorName }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const myItems = useMemo(() => {
    return items.filter(e => e[vendorName]);
  }, [items, vendorName]);

  const toggle = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  return (
    <Dropdown
      className=""
      autoClose="outside"
      title={officialVendorName}
      variant="primary"
      show={dropdownOpen}
      onToggle={toggle}>
      <Dropdown.Toggle variant="dark" className="text-info" as={NavLink}>
        {officialVendorName}
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark" className="bg-dark border border-info" show={dropdownOpen}>
        {myItems.map(e => (
          <SingleDropDown
            key={`${e.name}-${vendorName}`}
            itemObj={e}
            items={items}
            vendorName={vendorName}
            vendors={e.vendors}
          />
        ))}
      </Dropdown.Menu>
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
