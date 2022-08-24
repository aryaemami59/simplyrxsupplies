import { Dropdown } from "react-bootstrap";
import { memo, useState, useCallback, useContext, FC } from "react";
import SingleDropDown from "./SingleDropDown";
import { useSelector, shallowEqual } from "react-redux";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../addedSlice";
// import PropTypes from "prop-types";
import { DarkMode } from "../../../App";

interface Props {
  vendorName: string;
}

const VendorDropDown: FC<Props> = ({ vendorName }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const officialVendorName = useSelector(selectVendorOfficialName(vendorName));
  const myItems = useSelector(selectItemsByVendor(vendorName), shallowEqual);

  const toggle = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  return (
    <Dropdown
      autoClose="outside"
      title={officialVendorName}
      show={dropdownOpen}
      onToggle={toggle}>
      <Dropdown.Toggle
        className={`custom-text-shadow-white btn ${
          dropdownOpen ? "btn-info text-white" : "text-info"
        }`}
        as="button">
        {officialVendorName}
      </Dropdown.Toggle>
      <Dropdown.Menu
        renderOnMount
        className={`border border-info ${darkTheme ? "bg-dark" : "bg-light"}`}
        show={dropdownOpen}>
        {myItems.map((e) => (
          <SingleDropDown
            key={`${e.name}-${vendorName}`}
            itemObj={e}
            vendorName={vendorName}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

// VendorDropDown.propTypes = {
//   vendorName: PropTypes.string,
// };

export default memo(VendorDropDown);
