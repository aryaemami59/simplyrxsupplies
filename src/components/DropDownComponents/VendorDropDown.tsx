import Button from "@mui/material/Button"
import type { MenuProps } from "@mui/material/Menu"
import Menu from "@mui/material/Menu"
import type { MouseEventHandler } from "react"
import { useCallback, useMemo, useState } from "react"
import {
  useOfficialVendorName,
  useVendorItemIds,
} from "../../redux/selectors.js"
import type { ItemIdAndVendorId } from "../../types/reduxHelperTypes.js"
import { SingleDropDown } from "./SingleDropDown.js"

const anchorOrigin = {
  horizontal: "left",
  vertical: "bottom",
} as const satisfies MenuProps["anchorOrigin"]

const paper = {
  className: "paper",
} as const satisfies NonNullable<MenuProps["slotProps"]>["paper"]

type Props = Pick<ItemIdAndVendorId, "vendorId">

export const VendorDropDown = ({ vendorId }: Props) => {
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

  const buttonId = `${vendorId.toString()}-VendorDropDown` as const

  const menuId = `${officialVendorName}-VendorDropDown-Menu` as const

  const slotProps = useMemo(
    () =>
      ({
        list: {
          "aria-labelledby": buttonId,
          autoFocus: true,
          className: "menu-list",
        },

        paper,
      }) as const satisfies MenuProps["slotProps"],
    [buttonId],
  )

  return (
    <>
      <Button
        aria-controls={open ? menuId : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        className="rounded-pill"
        disableElevation
        id={buttonId}
        onClick={handleOpen}
        variant="contained"
      >
        {officialVendorName}
      </Button>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={anchorOrigin}
        aria-expanded={open}
        aria-labelledby={buttonId}
        id={menuId}
        onClose={handleClose}
        open={open}
        slotProps={slotProps}
        variant="menu"
      >
        {itemIds.map(itemId => (
          <SingleDropDown
            itemId={itemId}
            key={`${itemId.toString()}-${vendorId.toString()}-SingleDropDown`}
            vendorId={vendorId}
          />
        ))}
      </Menu>
    </>
  )
}
