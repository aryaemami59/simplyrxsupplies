import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { ModalBodyContent } from "./ModalBodyContent.js"

type Props = {
  readonly hideModal: () => void
  readonly isModalOpen: boolean
}

export const RowItemsDialog = ({ hideModal, isModalOpen }: Props) => (
  <Dialog
    aria-labelledby="contained-modal-title-vcenter"
    fullWidth
    keepMounted
    maxWidth="md"
    onClose={hideModal}
    open={isModalOpen}
  >
    <DialogTitle>Item Details</DialogTitle>
    <DialogContent dividers>
      <ModalBodyContent />
    </DialogContent>
    <DialogActions>
      <Button onClick={hideModal} variant="contained">
        Close
      </Button>
    </DialogActions>
  </Dialog>
)
