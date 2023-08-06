import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";

import RowItemsDialog from "./RowItemsDialog";

const title = "Take a Closer Look at The Item Info";

const startIcon = <FontAwesomeIcon icon={faMagnifyingGlassPlus} />;

const RowSingleContainerModal: FC = () => {
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
        enterDelay={500}
        enterNextDelay={500}
        onClose={hideTooltip}
        onOpen={showTooltip}
        open={open}
        title={title}>
        <IconButton
          className="w-auto d-inline-block"
          onClick={showModal}
          size="medium">
          {startIcon}
        </IconButton>
      </Tooltip>
      <RowItemsDialog
        hideModal={hideModal}
        modalOpen={modalOpen}
      />
    </>
  );
};

export default memo(RowSingleContainerModal);
