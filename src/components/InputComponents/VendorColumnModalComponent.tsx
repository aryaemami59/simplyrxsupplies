import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import VendorColumnList from "../ColumnComponents/VendorColumnList";

const VendorColumnModalComponent: FC = () => {
  const [show, setShow] = useState(false);

  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(true);
  }, []);
  const hideModal = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={showModal}
        className="my-3 d-inline-block d-md-none w-75 rounded custom-text-shadow-white text-white shadow">
        Display Cart
      </Button>
      <Dialog
        // keepMounted
        maxWidth="md"
        fullWidth
        onClose={hideModal}
        open={show}>
        <DialogTitle>Item Vendors</DialogTitle>
        <DialogContent dividers>
          <div className="row justify-content-center">
            <div className="col-10 justify-content-center">
              <VendorColumnList />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={hideModal}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(VendorColumnModalComponent);
