import Button from "@mui/material/Button";
import type { DialogProps } from "@mui/material/Dialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";

import VendorColumnList from "../ColumnComponents/VendorColumnList";
import DisplayCartButton from "./DisplayCartButton";

const paperProps: DialogProps["PaperProps"] = {
  className: "m-0 w-100",
};

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
      <DisplayCartButton showModal={showModal} />
      {/* <Button
        variant="contained"
        size="large"
        onClick={showModal}
        startIcon={startIcon}
        className="my-3 d-inline-block d-md-none w-75 rounded custom-text-shadow-white text-white shadow">
        Display Cart
      </Button> */}
      <Dialog
        // keepMounted
        role="dialog"
        fullWidth
        maxWidth="md"
        onClose={hideModal}
        open={show}
        PaperProps={paperProps}>
        <DialogTitle>Item Vendors</DialogTitle>
        <DialogContent
          className="px-0"
          dividers>
          <div className="row justify-content-center">
            <div className="col-10 justify-content-center px-0">
              <VendorColumnList />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={hideModal}
            variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(VendorColumnModalComponent);
