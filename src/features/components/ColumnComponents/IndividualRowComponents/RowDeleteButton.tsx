import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import { removeItems } from "../../../../Redux/addedSlice";
import { useAppDispatch } from "../../../../Redux/hooks";

const title = "Delete The Item";

type Props = {
  vendorName: vendorNameType;
  itemObj: ItemObjType;
};

const RowDeleteButton: FC<Props> = ({ vendorName, itemObj }) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(removeItems({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName]);

  // const openTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
  //   setShow(true);
  // }, []);

  // const closeTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
  //   setShow(false);
  // }, []);

  return (
    <>
      {/* <Tooltip
        title={title}
        open={show}> */}
      <Button
        className="flex-grow-1"
        onClick={clickHandler}
        // onMouseEnter={openTooltip}
        // onMouseLeave={closeTooltip}
        variant="contained"
        startIcon={<DeleteIcon />}>
        Delete
      </Button>
      {/* </Tooltip> */}
    </>
  );
};

export default memo<Props>(RowDeleteButton);
