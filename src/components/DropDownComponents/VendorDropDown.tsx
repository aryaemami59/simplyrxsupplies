import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import type { MenuListProps } from "@mui/material/MenuList";
import type { PaperProps } from "@mui/material/Paper";
import type { PopoverOrigin } from "@mui/material/Popover";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";

import useItemNames from "../../hooks/useItemNames";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import type { VendorName } from "../../types/aa";
import { vendorNames } from "../../types/aa";
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
  vendorName: VendorName;
};

const VendorDropDown: FC<Props> = ({ vendorName }) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const open = !!anchorElement;
  const officialVendorName = useOfficialVendorName(vendorName);

  const itemNames = useItemNames(vendorName);

  const handleOpen: MouseEventHandler<HTMLElement> = useCallback(event => {
    setAnchorElement(event.currentTarget);
  }, []);

  const handleClose: MouseEventHandler<HTMLElement> = useCallback(() => {
    setAnchorElement(null);
  }, []);

  return (
    <>
      <Button
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        className="rounded-pill"
        disableElevation
        id={vendorName}
        onClick={handleOpen}
        variant="contained">
        {officialVendorName}
      </Button>
      {/* <Chip
        id={vendorName}
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        label={officialVendorName}
      /> */}
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={anchorOrigin}
        aria-expanded={open}
        aria-labelledby={vendorName}
        autoFocus
        id={officialVendorName}
        MenuListProps={menuListProps}
        onClose={handleClose}
        open={open}
        PaperProps={paperProps}
        transformOrigin={transformOrigin}
        variant="menu">
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
