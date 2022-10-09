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
import { vendorNameType } from "../../../customTypes/types";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import SingleDropDown from "./SingleDropDown";

const transformOrigin: PopoverOrigin = {
  horizontal: "left",
  vertical: "top",
};

const anchorOrigin: PopoverOrigin = { vertical: "bottom", horizontal: "left" };

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
  vendorName: vendorNameType;
};

const VendorDropDown: FC<Props> = ({ vendorName }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const items = useAppSelector(selectItemsByVendor(vendorName), shallowEqual);

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
        // keepMounted
        id={officialVendorName}
        MenuListProps={menuListProps}
        anchorEl={anchorEl}
        open={dropdownOpen}
        onClose={handleClose}
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
        PaperProps={paperProps}>
        {items.map(itemObj => (
          <SingleDropDown
            key={`${itemObj.id}-${vendorName}`}
            {...{ itemObj, vendorName }}
          />
        ))}
      </Menu>
    </>
  );
};

export default memo<Props>(VendorDropDown);
