import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import { removeItems } from "../../../../Redux/addedSlice";
import { useAppDispatch } from "../../../../Redux/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const title = "Click Here to Remove The Item";

type Props = {
  vendorName: vendorNameType;
  itemObj: ItemObjType;
};

const RowRemoveButton: FC<Props> = ({ vendorName, itemObj }) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(removeItems({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName]);

  const openTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <Tooltip
        title={title}
        open={show}>
        {/* <IconButton
          onClick={clickHandler}
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}> */}
        <Button
          onClick={clickHandler}
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
          variant="contained"
          startIcon={<DeleteIcon />}>
          Delete
        </Button>

        {/* <FontAwesomeIcon
            icon={faClose}
            aria-label="remove item"
            key={`${vendorName}-${itemObj.name}-CloseButton`}
            size="1x"
            role="button"
          /> */}
        {/* </IconButton> */}
      </Tooltip>
      {/* <Overlay
        target={target.current}
        show={show}
        placement="top"
        key={`${vendorName}-RemoveButton-Overlay`}>
        {props => (
          <Tooltip
            key={`RemoveButton-tooltip-${vendorName}-${itemObj.name}`}
            id={`RemoveButton-tooltip-${vendorName}-${itemObj.name}`}
            {...props}>
            Click Here to Remove The Item
          </Tooltip>
        )}
      </Overlay> */}
    </>
  );
};

export default memo<Props>(RowRemoveButton);
