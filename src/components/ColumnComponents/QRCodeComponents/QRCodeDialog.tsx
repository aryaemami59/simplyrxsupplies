import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { useOfficialVendorName } from "../../../redux/selectors.js"
import { QRCodeImage } from "./QRCodeImage.js"

type Props = {
  readonly hideModal: () => void
  readonly isModalOpen: boolean
}

export const QRCodeDialog = ({ hideModal, isModalOpen }: Props) => {
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
      <DialogTitle>QR Code for items added to {officialVendorName}</DialogTitle>
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
