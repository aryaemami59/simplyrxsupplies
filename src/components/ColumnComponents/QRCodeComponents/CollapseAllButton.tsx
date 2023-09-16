import { faMinimize } from "@fortawesome/free-solid-svg-icons/faMinimize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";

import useVendorId from "../../../hooks/useVendorId";
import { minimizeAllItemsInCart } from "../../../redux/addedSlice";
import { useAppDispatch } from "../../../redux/hooks";

const title = "Collapse All Items";

const startIcon = <FontAwesomeIcon icon={faMinimize} />;

const CollapseAllButton: FC = () => {
  const vendorId = useVendorId();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleCollapse = useCallback(() => {
    dispatch(minimizeAllItemsInCart({ vendorId }));
  }, [dispatch, vendorId]);

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
        onClick={toggleCollapse}
        size="large">
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

export default memo(CollapseAllButton);
