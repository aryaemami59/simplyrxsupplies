import { Dropdown } from "react-bootstrap";
import { memo, useState, useMemo, useCallback } from "react";
import SingleDropDown from "./SingleDropDown";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectAllItems } from "../../../addedSlice";
import { Row } from "react-bootstrap";

function VendorDropDown({ officialVendorName, vendorName }) {
  const items = useSelector(selectAllItems);
  const isLoading = useSelector(state => state.item.isLoading);
  const errMsg = useSelector(state => state.item.errMsg);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const myItems = useMemo(() => {
    return items.filter(e => e[vendorName]);
  }, [items, vendorName]);

  const toggle = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  if (isLoading) {
    return <Row>is loading</Row>;
  }

  if (errMsg) {
    return <Row>error</Row>;
  }

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
        variant="dark"
        className="bg-dark border border-info"
        show={dropdownOpen}>
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
  vendorName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(VendorDropDown);
