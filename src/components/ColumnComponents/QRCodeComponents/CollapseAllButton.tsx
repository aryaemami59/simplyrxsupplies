import { faMinimize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import useVendorName from "../../../hooks/useVendorName";
import { minimizeAll } from "../../../Redux/addedSlice";
import { useAppDispatch } from "../../../Redux/hooks";

const title = "Collapse All Items";

const startIcon = <FontAwesomeIcon icon={faMinimize} />;

const CollapseAllButton: FC = () => {
  const vendorName = useVendorName();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleCollapse = useCallback(() => {
    dispatch(minimizeAll(vendorName));
  }, [dispatch, vendorName]);

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

export default memo(CollapseAllButton);
