import { faMaximize } from "@fortawesome/free-solid-svg-icons/faMaximize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";

import useVendorId from "../../../hooks/useVendorId";
import { maximizeAllItemsInCart } from "../../../redux/addedSlice";
import { useAppDispatch } from "../../../redux/hooks";

const title = "Expand All Items";

const startIcon = <FontAwesomeIcon icon={faMaximize} />;

const ExpandAllButton: FC = () => {
  const vendorId = useVendorId();
  const dispatch = useAppDispatch();

  const toggleCollapse = useCallback(() => {
    dispatch(maximizeAllItemsInCart({ vendorId }));
  }, [dispatch, vendorId]);

  const [open, setOpen] = useState(false);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Tooltip
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

export default memo(ExpandAllButton);
