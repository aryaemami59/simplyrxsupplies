import { Dropdown } from "react-bootstrap";
import {
  memo,
  useState,
  useCallback,
  useContext,
  FC,
  SetStateAction,
  Dispatch,
} from "react";
import SingleDropDown from "./SingleDropDown";
import { shallowEqual } from "react-redux";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../addedSlice";
import { DarkMode, myContextInterface } from "../../../App";
import { useAppSelector } from "../../../data/store";
import { itemInterface } from "../../../addedSlice";

interface Props {
  vendorName: string;
}

const VendorDropDown: FC<Props> = ({ vendorName }): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const [dropdownOpen, setDropdownOpen]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const officialVendorName: string = useAppSelector<string>(
    selectVendorOfficialName(vendorName)
  );
  const myItems: itemInterface[] = useAppSelector<itemInterface[]>(
    selectItemsByVendor(vendorName),
    shallowEqual
  );
  const dropdownOpenColor: "text-white btn-info" | "text-white btn-dark" =
    darkTheme ? "text-white btn-info" : "text-white btn-dark";

  const toggle: () => void = useCallback((): void => {
    setDropdownOpen((prev: Boolean): false => !prev);
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

export default memo<Props>(VendorDropDown);
