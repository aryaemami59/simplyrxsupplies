import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import useVendorName from "../../../hooks/useVendorName";
import { maximizeAll } from "../../../redux/addedSlice";
import { useAppDispatch } from "../../../redux/hooks";

const title = "Expand All Items";

const startIcon = <FontAwesomeIcon icon={faMaximize} />;

const ExpandAllButton: FC = () => {
  const vendorName = useVendorName();
  const dispatch = useAppDispatch();

  const toggleCollapse = useCallback(() => {
    dispatch(maximizeAll(vendorName));
  }, [dispatch, vendorName]);

  const [open, setOpen] = useState(false);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Tooltip
      onOpen={showTooltip}
      onClose={hideTooltip}
      enterDelay={500}
      enterNextDelay={500}
      title={title}
      open={open}>
      <IconButton
        onClick={toggleCollapse}
        size="large"
        className="d-inline-block w-auto">
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

export default memo(ExpandAllButton);
