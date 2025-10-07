import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"
import type { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import type { MouseEventHandler } from "react"
import { memo, useCallback, useState } from "react"
import { OffcanvasBodyContent } from "./OffcanvasBodyContent.js"

const slotProps = {
  paper: {
    className: "mw-75",
  },
} as const satisfies SwipeableDrawerProps["slotProps"]

export const OffcanvasComponent = memo(() => {
  const [show, setShow] = useState(false)

  const handleOpen = useCallback<MouseEventHandler<HTMLElement>>(() => {
    setShow(true)
  }, [])

  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  return (
    <>
      <IconButton className="align-self-start" onClick={handleOpen}>
        <MenuIcon className="text-white d-lg-none" />
      </IconButton>
      <SwipeableDrawer
        onClose={handleClose}
        onOpen={handleOpen}
        open={show}
        slotProps={slotProps}
      >
        <OffcanvasBodyContent />
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </SwipeableDrawer>
    </>
  )
})
