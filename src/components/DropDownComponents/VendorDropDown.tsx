import Button from "@mui/material/Button"
import type { MenuProps } from "@mui/material/Menu"
import Menu from "@mui/material/Menu"
import type { MenuListProps } from "@mui/material/MenuList"
import type { PopoverOrigin } from "@mui/material/Popover"
import type { FC, MouseEventHandler } from "react"
import { memo, useCallback, useState } from "react"
import { useOfficialVendorName, useVendorItemIds } from "../../redux/selectors"
import SingleDropDown from "./SingleDropDown"

const transformOrigin = {
  horizontal: "left",
  vertical: "top",
} as const satisfies PopoverOrigin

const anchorOrigin = {
  vertical: "bottom",
  horizontal: "left",
} as const satisfies PopoverOrigin

const menuListProps = {
  "aria-labelledby": "menu-list",
  className: "menu-list",
  autoFocus: true,
  style: {
    maxHeight: "calc(100vh - 54px)",
  },
} as const satisfies MenuListProps

const slotProps = {
  paper: {
    className: "paper",
  },
} as const satisfies MenuProps["slotProps"]

type Props = {
  vendorId: number
}

const VendorDropDown: FC<Props> = ({ vendorId }) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const open = !!anchorElement

  const officialVendorName = useOfficialVendorName(vendorId)

  const itemIds = useVendorItemIds(vendorId)

  const handleOpen: MouseEventHandler<HTMLElement> = useCallback(event => {
    setAnchorElement(event.currentTarget)
  }, [])

  const handleClose: MouseEventHandler<HTMLElement> = useCallback(() => {
    setAnchorElement(null)
  }, [])

  return (
    <>
      <Button
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        className="rounded-pill"
        disableElevation
        id={vendorId.toString()}
        onClick={handleOpen}
        variant="contained"
      >
        {officialVendorName}
      </Button>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={anchorOrigin}
        aria-expanded={open}
        aria-labelledby={vendorId.toString()}
        // autoFocus
        id={officialVendorName}
        MenuListProps={menuListProps}
        onClose={handleClose}
        open={open}
        slotProps={slotProps}
        transformOrigin={transformOrigin}
        variant="menu"
      >
        {itemIds.map(itemId => (
          <SingleDropDown
            key={`${itemId.toString()}-${vendorId.toString()}`}
            itemId={itemId}
            vendorId={vendorId}
          />
        ))}
      </Menu>
    </>
  )
}

export default memo<Props>(VendorDropDown)
