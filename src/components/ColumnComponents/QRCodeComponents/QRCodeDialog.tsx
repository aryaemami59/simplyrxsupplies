import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import PropTypes from "prop-types"
import type { FC } from "react"
import { memo } from "react"

import { useVendorId } from "../../../hooks/useVendorId"
import { useOfficialVendorName } from "../../../redux/selectors"
import QRCodeImage from "./QRCodeImage"

type Props = {
  hideModal: () => void
  isModalOpen: boolean
}

const QRCodeDialog: FC<Props> = ({ hideModal, isModalOpen }) => {
  const vendorId = useVendorId()

  const officialVendorName = useOfficialVendorName(vendorId)

  return (
    <Dialog
      fullWidth
      keepMounted
      maxWidth="md"
      onClose={hideModal}
      open={isModalOpen}
    >
      <DialogTitle>QRCode for Items Added to {officialVendorName}</DialogTitle>
      <DialogContent className="justify-content-center d-flex" dividers>
        <QRCodeImage className="w-75" />
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

QRCodeDialog.propTypes = {
  hideModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
}

export default memo<Props>(QRCodeDialog)
