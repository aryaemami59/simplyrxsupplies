import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Button } from "react-bootstrap"
import { useItemId } from "../../../../hooks/useItemId.js"
import { useItemName } from "../../../../redux/selectors.js"
import { BarcodeImage } from "../BarcodeImage.js"

type Props = {
  readonly hideModal: () => void
  readonly isModalOpen: boolean
}

export const RowBarcodeDialog = ({ hideModal, isModalOpen }: Props) => {
  const itemId = useItemId()

  const itemName = useItemName(itemId)

  return (
    <Dialog
      fullWidth
      keepMounted
      maxWidth="md"
      onClose={hideModal}
      open={isModalOpen}
    >
      <DialogTitle>{itemName}</DialogTitle>
      <DialogContent className="justify-content-center d-flex" dividers>
        <BarcodeImage className="w-100" />
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal} variant="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
