import MenuIcon from "@mui/icons-material/Menu";
import type { PaperProps } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";

import OffcanvasBodyContent from "./OffcanvasBodyContent";

const paperProps: PaperProps = {
  className: "mw-75",
};

const OffcanvasComponent: FC = () => {
  const [show, setShow] = useState(false);

  const handleOpen: MouseEventHandler<HTMLElement> = useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <IconButton
        className="align-self-start"
        onClick={handleOpen}>
        <MenuIcon className="text-white d-lg-none" />
      </IconButton>
      <SwipeableDrawer
        onClose={handleClose}
        onOpen={handleOpen}
        open={show}
        PaperProps={paperProps}>
        <OffcanvasBodyContent />
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained">
            Close
          </Button>
        </DialogActions>
      </SwipeableDrawer>
    </>
  );
};

export default memo(OffcanvasComponent);
