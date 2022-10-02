import { Dropdown } from "react-bootstrap";
import { memo, useState, useCallback, useContext, FC } from "react";
import SingleDropDown from "./SingleDropDown";
import { shallowEqual } from "react-redux";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../Redux/addedSlice";
import { DarkMode } from "../../../App";
import { vendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";

type Props = {
  vendorName: vendorNameType;
};

const VendorDropDown: FC<Props> = ({ vendorName }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const items = useAppSelector(selectItemsByVendor(vendorName), shallowEqual);

  const toggle = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  const dropdownOpenColor: "text-white btn-info" | "text-white btn-dark" =
    darkTheme ? "text-white btn-info" : "text-white btn-dark";
  const border = darkTheme
    ? "border-info bg-dark text-info"
    : "border-dark bg-light text-dark";
  const theme = darkTheme ? "dark" : "light";
  const textColor = darkTheme ? "text-info" : "btn-light";
  const toggleClassName = dropdownOpen ? dropdownOpenColor : "";

  return (
    <Dropdown
      autoClose="outside"
      title={officialVendorName}
      show={dropdownOpen}
      focusFirstItemOnShow="keyboard"
      onToggle={toggle}>
      <Dropdown.Toggle
        className={`custom-text-shadow-whit btn ${textColor} ${toggleClassName}`}
        as="button">
        {officialVendorName}
      </Dropdown.Toggle>
      <Dropdown.Menu
        variant={theme}
        renderOnMount
        className={`border ${border}`}
        show={dropdownOpen}>
        {items.map(itemObj => (
          <SingleDropDown
            key={`${itemObj.id}-${vendorName}`}
            {...{ itemObj, vendorName }}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default memo<Props>(VendorDropDown);
