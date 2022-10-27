import {
  Button,
  Menu,
  MenuListProps,
  PaperProps,
  PopoverOrigin,
} from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { VendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import { selectVendorOfficialName } from "../../../Redux/selectors";
import useItemNames from "../../customHooks/useItemNames";
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
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

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

export default memo<Props>(VendorDropDown);
