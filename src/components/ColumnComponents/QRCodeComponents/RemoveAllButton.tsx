import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import useVendorName from "../../../hooks/useVendorName";
import { removeAllItems } from "../../../Redux/addedSlice";
import { useAppDispatch } from "../../../Redux/hooks";

const startIcon = <FontAwesomeIcon icon={faTrashCan} />;

const title = "Remove All Items";

const RemoveAllButton: FC = () => {
  const [open, setOpen] = useState(false);
  const vendorName = useVendorName();
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(() => {
    dispatch(removeAllItems(vendorName));
  }, [dispatch, vendorName]);

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
        onClick={clickHandler}
        className="d-inline-block w-auto"
        size="large">
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

export default memo(RemoveAllButton);
