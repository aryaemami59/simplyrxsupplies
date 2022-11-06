import PropTypes from "prop-types";
import {
  Button,
  Menu,
  MenuListProps,
  PaperProps,
  PopoverOrigin,
} from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { VendorNameType, vendorNames } from "../../../custom_types/types";
import useItemNames from "../../hooks/useItemNames";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
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
  "aria-labelledby": "menu-list",
  className: "menu-list",
  autoFocus: true,
  style: {
    maxHeight: "calc(100vh - 54px)",
  },
};

const paperProps: PaperProps = {
  className: "paper",
};

type Props = {
  vendorName: VendorNameType;
};

const VendorDropDown: FC<Props> = ({ vendorName }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;
  const officialVendorName = useOfficialVendorName(vendorName);

  const itemNames = useItemNames(vendorName);

  const handleOpen: MouseEventHandler<HTMLElement> = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose: MouseEventHandler<HTMLElement> = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Button
        id={vendorName}
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        variant="contained"
        disableElevation
        onClick={handleOpen}>
        {officialVendorName}
      </Button>
      <Menu
        autoFocus
        aria-expanded={open}
        aria-labelledby={vendorName}
        id={officialVendorName}
        MenuListProps={menuListProps}
        anchorEl={anchorEl}
        variant="menu"
        open={open}
        onClose={handleClose}
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
        PaperProps={paperProps}>
        {itemNames.map(itemName => (
          <SingleDropDown
            key={`${itemName}-${vendorName}`}
            itemName={itemName}
            vendorName={vendorName}
          />
        ))}
      </Menu>
    </>
  );
};

VendorDropDown.propTypes = {
  vendorName: PropTypes.oneOf(vendorNames).isRequired,
};

export default memo<Props>(VendorDropDown);
