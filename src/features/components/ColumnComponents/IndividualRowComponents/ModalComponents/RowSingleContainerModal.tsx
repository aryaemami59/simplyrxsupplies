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

const startIcon = <FontAwesomeIcon icon={faMagnifyingGlassPlus} />;

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
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
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
          onClick={showModal}
          variant="contained"
          startIcon={startIcon}>
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
