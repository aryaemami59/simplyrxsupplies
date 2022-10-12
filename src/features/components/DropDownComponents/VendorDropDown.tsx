// import { Props } from "@fortawesome/react-fontawesome";
import {
  Button,
  Menu,
  MenuListProps,
  PaperProps,
  PopoverOrigin,
} from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { shallowEqual } from "react-redux";
import { VendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import {
  selectItemNamesByVendor,
  selectVendorOfficialName,
} from "../../../Redux/selectors";
import SingleDropDown from "./SingleDropDown";

const transformOrigin: PopoverOrigin = {
  horizontal: "left",
  vertical: "top",
};

const anchorOrigin: PopoverOrigin = {
  vertical: "bottom",
  horizontal: "left",
};

const menuListProps: MenuListProps = {
  "aria-labelledby": "customized-button",
  className: "menu-list",
  style: {
    maxHeight: "calc(100vh - 54px)",
  },
};

const paperProps: PaperProps = {
  className: "paper",
  // style: {
  //   width: 250,
  // },
};

type Props = {
  vendorName: VendorNameType;
};

const VendorDropDown: FC<Props> = ({ vendorName }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const itemNames = useAppSelector(
    selectItemNamesByVendor(vendorName),
    shallowEqual
  );

  const handleOpen: MouseEventHandler<HTMLElement> = useCallback(event => {
    setAnchorEl(event.currentTarget);
    setDropdownOpen(true);
  }, []);

  const handleClose: MouseEventHandler<HTMLElement> = useCallback(() => {
    setAnchorEl(null);
    setDropdownOpen(false);
  }, []);

  return (
    <>
      <Button
        id={vendorName}
        aria-haspopup="true"
        variant="contained"
        disableElevation
        onClick={handleOpen}>
        {officialVendorName}
      </Button>
      <Menu
        // autoFocus
        aria-expanded={dropdownOpen}
        // keepMounted
        id={officialVendorName}
        MenuListProps={menuListProps}
        anchorEl={anchorEl}
        variant="menu"
        // variant="selectedMenu"
        open={dropdownOpen}
        onClose={handleClose}
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
        PaperProps={paperProps}>
        {itemNames.map(itemName => (
          <SingleDropDown
            key={`${itemName}-${vendorName}`}
            {...{ itemName, vendorName }}
          />
        ))}
      </Menu>
    </>
  );
};

export default memo<Props>(VendorDropDown);
