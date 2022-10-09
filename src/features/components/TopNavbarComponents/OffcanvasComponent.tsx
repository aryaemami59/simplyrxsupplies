import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  SwipeableDrawer,
  DialogActions,
  Button,
  PaperProps,
  ModalProps,
} from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import OffcanvasBodyContent from "./OffcanvasBodyContent";

const paperProps: PaperProps = {
  className: "mw-75",
  style: { maxWidth: "75%" },
};

const modalProps: Partial<ModalProps<"div", {}>> = {
  // keepMounted: true,
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
        // size="large"
        onClick={handleOpen}
        className="align-self-start">
        <MenuIcon
          // fontSize="large"
          className="text-white d-lg-none"
        />
      </IconButton>
      <SwipeableDrawer
        onOpen={handleOpen}
        open={show}
        // keepMounted
        PaperProps={paperProps}
        ModalProps={modalProps}
        onClose={handleClose}>
        <OffcanvasBodyContent />
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </SwipeableDrawer>
    </>
  );
};

export default memo(OffcanvasComponent);
