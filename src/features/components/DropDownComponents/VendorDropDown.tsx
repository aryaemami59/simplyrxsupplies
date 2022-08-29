import { Dropdown } from "react-bootstrap";
import { memo, useState, useCallback, useContext, FC } from "react";
import SingleDropDown from "./SingleDropDown";
import { shallowEqual } from "react-redux";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../addedSlice";
import { DarkMode } from "../../../App";
import { useAppSelector } from "../../../data/store";

interface Props {
  vendorName: string;
}

const VendorDropDown: FC<Props> = ({ vendorName }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const myItems = useAppSelector(selectItemsByVendor(vendorName), shallowEqual);
  const dropdownOpenColor = darkTheme
    ? "text-white btn-info"
    : "text-white btn-dark";

  const toggle = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  return (
    <Dropdown
      autoClose="outside"
      title={officialVendorName}
      show={dropdownOpen}
      focusFirstItemOnShow="keyboard"
      onToggle={toggle}>
      <Dropdown.Toggle
        className={`custom-text-shadow-whit btn
        ${darkTheme ? "text-info" : "btn-light"}
        ${dropdownOpen ? dropdownOpenColor : ""}`}
        as="button">
        {officialVendorName}
      </Dropdown.Toggle>
      <Dropdown.Menu
        variant={darkTheme ? "dark" : "light"}
        renderOnMount
        className={`border ${
          darkTheme
            ? "border-info bg-dark text-info"
            : "border-dark bg-light text-dark"
        }`}
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
};

export default memo(VendorDropDown);
