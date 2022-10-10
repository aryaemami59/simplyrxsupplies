import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { VendorAndItemName } from "../../../../customTypes/types";
import { removeItems } from "../../../../Redux/addedSlice";
import { useAppDispatch } from "../../../../Redux/hooks";

// const title = "Delete The Item";

// type Props = {
//   vendorName: VendorNameType;
//   itemObj: ItemObjType;
// };

type Props = VendorAndItemName;

const RowDeleteButton: FC<Props> = ({ vendorName, itemName }) => {
  // const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(removeItems({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

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
