import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";
import useItemName from "../../../hooks/useItemName";
import useVendorName from "../../../hooks/useVendorName";
import { removeItems } from "../../../Redux/addedSlice";
import { useAppDispatch } from "../../../Redux/hooks";

const startIcon = <FontAwesomeIcon icon={faDeleteLeft} />;
// const startIcon = <DeleteIcon />;

const title = "Delete This Item";

const RowDeleteButton: FC = () => {
  const [open, setOpen] = useState(false);
  const itemName = useItemName();
  const vendorName = useVendorName();
  const dispatch = useAppDispatch();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(removeItems({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

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
        size="medium"
        className="w-auto d-inline-block"
        onClick={clickHandler}>
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

export default memo(RowDeleteButton);
