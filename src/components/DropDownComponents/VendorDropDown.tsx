import Button from "@mui/material/Button"
import type { MenuProps } from "@mui/material/Menu"
import Menu from "@mui/material/Menu"
import type { PopoverOrigin } from "@mui/material/Popover"
import type { MouseEventHandler } from "react"
import { memo, useCallback, useState } from "react"
import {
  useOfficialVendorName,
  useVendorItemIds,
} from "../../redux/selectors.js"
import { SingleDropDown } from "./SingleDropDown.js"

const transformOrigin = {
  horizontal: "left",
  vertical: "top",
} as const satisfies PopoverOrigin

const anchorOrigin = {
  horizontal: "left",
  vertical: "bottom",
} as const satisfies PopoverOrigin

const slotProps = {
  list: {
    "aria-labelledby": "menu-list",
    autoFocus: true,
    className: "menu-list",
    style: {
      maxHeight: "calc(100vh - 54px)",
    },
  },

  paper: {
    className: "paper",
  },
} as const satisfies MenuProps["slotProps"]

type Props = {
  readonly vendorId: number
}

export const VendorDropDown = memo(({ vendorId }: Props) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const open = !!anchorElement

  const officialVendorName = useOfficialVendorName(vendorId)

  const itemIds = useVendorItemIds(vendorId)

  const handleOpen = useCallback<MouseEventHandler<HTMLElement>>(event => {
    setAnchorElement(event.currentTarget)
  }, [])

  const handleClose = useCallback<MouseEventHandler<HTMLElement>>(() => {
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
        onClose={handleClose}
        open={open}
        slotProps={slotProps}
        transformOrigin={transformOrigin}
        variant="menu"
      >
        {itemIds.map(itemId => (
          <SingleDropDown
            itemId={itemId}
            key={`${itemId.toString()}-${vendorId.toString()}`}
            vendorId={vendorId}
          />
        ))}
      </Menu>
    </>
  )
})
