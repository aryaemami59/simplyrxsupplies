// import { Props } from "@fortawesome/react-fontawesome";
import { Button, Menu, MenuList, MenuProps } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { shallowEqual } from "react-redux";
import { vendorNameType } from "../../../customTypes/types";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import SingleDropDown from "./SingleDropDown";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// const MyMenuProps: MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

type Props = {
  vendorName: vendorNameType;
};

const VendorDropDown: FC<Props> = ({ vendorName }): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null!);
  // const { darkTheme } = useContext(DarkMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const items = useAppSelector(selectItemsByVendor(vendorName), shallowEqual);
  // const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // }, []);

  const toggle = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setDropdownOpen(prev => !prev);
  }, []);

  // const dropdownOpenColor: "text-white btn-info" | "text-white btn-dark" =
  //   darkTheme ? "text-white btn-info" : "text-white btn-dark";
  // const border = darkTheme
  //   ? "border-info bg-dark text-info"
  //   : "border-dark bg-light text-dark";
  // const theme = darkTheme ? "dark" : "light";
  // const textColor = darkTheme ? "text-info" : "btn-light";
  // const toggleClassName = dropdownOpen ? dropdownOpenColor : "";

  return (
    <>
      <div>
        <Button
          id="customized-button"
          aria-controls={dropdownOpen ? "customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={dropdownOpen ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={toggle}>
          {officialVendorName}
        </Button>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "customized-button",
          }}
          anchorEl={anchorEl}
          open={dropdownOpen}
          onClose={toggle}
          anchorOrigin={{ vertical: 37, horizontal: "left" }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          }}>
          <MenuList
            autoFocus
            autoFocusItem>
            {items.map(itemObj => (
              <SingleDropDown
                key={`${itemObj.id}-${vendorName}`}
                {...{ itemObj, vendorName }}
              />
            ))}
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

export default memo<Props>(VendorDropDown);
