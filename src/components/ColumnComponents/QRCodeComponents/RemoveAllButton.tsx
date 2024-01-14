import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";

import useVendorId from "../../../hooks/useVendorId";
import { allItemsRemovedFromCart } from "../../../redux/addedSlice";
import { useAppDispatch } from "../../../redux/hooks";

const startIcon = <FontAwesomeIcon icon={faTrashCan} />;

const title = "Remove All Items";

const RemoveAllButton: FC = () => {
  const [open, setOpen] = useState(false);
  const vendorId = useVendorId();
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    dispatch(allItemsRemovedFromCart({ vendorId }));
  }, [dispatch, vendorId]);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Tooltip
      role="tooltip"
      enterDelay={500}
      enterNextDelay={500}
      onClose={hideTooltip}
      onOpen={showTooltip}
      open={open}
      title={title}>
      <IconButton
        className="d-inline-block w-auto"
        onClick={clickHandler}
        size="large">
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

export default memo(RemoveAllButton);
