import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import RowItemsDialog from "./RowItemsDialog";

const title = "Take a Closer Look at The Item Info";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

// const TIMEOUT = 3000;
let timer;

const RowSingleContainerModal: FC<Props> = ({ itemObj, vendorName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setModalOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const showTooltip = useCallback(() => {
    // timer = setTimeout(() => {
    //   setOpen(true);
    // }, 1000);
    // timer = setTimeout(() => {
    setOpen(true);
    // }, TIMEOUT);
  }, []);

  const hideTooltip = useCallback(() => {
    // clearTimeout(timer);
    setOpen(false);
  }, []);

  return (
    <>
      <Tooltip
        onOpen={showTooltip}
        onClose={hideTooltip}
        enterDelay={1500}
        enterNextDelay={1500}
        title={title}
        open={open}>
        <Button
          className="flex-grow-1"
          // onMouseEnter={showTooltip}
          // onMouseLeave={hideTooltip}
          onClick={showModal}
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}>
          Magnify
        </Button>
      </Tooltip>
      <RowItemsDialog
        hideModal={hideModal}
        itemObj={itemObj}
        modalOpen={modalOpen}
        vendorName={vendorName}
      />
    </>
  );
};

export default memo<Props>(RowSingleContainerModal);
