import { Button, ButtonGroup, Collapse, Fade } from "@mui/material";
import type { FC } from "react";
import { memo, useCallback } from "react";
import useItemName from "../../../hooks/useItemName";
import useVendorName from "../../../hooks/useVendorName";
import { minimizeItem } from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { checkIfMinimized } from "../../../Redux/selectors";
import CollapseButton from "./CollapseButton";
import RowSingleContainerModal from "./ModalComponents/RowSingleContainerModal";
import RowDeleteButton from "./RowDeleteButton";
import RowSingleItemInfo from "./RowSingleItemInfo";

const RowSingleContainer: FC = () => {
  const itemName = useItemName();
  const vendorName = useVendorName();
  const dispatch = useAppDispatch();
  const open = useAppSelector(checkIfMinimized(vendorName, itemName));

  const toggleFade = useCallback(() => {
    dispatch(minimizeItem({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

  return (
    <div className="rounded border mb-4">
      <div className="my-3 container-fluid">
        <div className="justify-content-evenly align-items-center row">
          <div className="col-xs-auto d-flex">
            <ButtonGroup
              fullWidth
              className="flex-wrap justify-content-between">
              <RowSingleContainerModal />
              <CollapseButton
                open={open}
                toggle={toggleFade}
              />
              <RowDeleteButton />
            </ButtonGroup>
          </div>
          <div className="col-12 col-xl-7 col-xxl-9">
            <Fade
              in={open}
              mountOnEnter
              unmountOnExit>
              <Button
                aria-controls="maximize content"
                variant="contained"
                className="w-100"
                onClick={toggleFade}>
                {itemName}
              </Button>
            </Fade>
          </div>
        </div>
      </div>
      <Collapse in={!open}>
        <div>
          <RowSingleItemInfo />
        </div>
      </Collapse>
    </div>
  );
};

export default memo(RowSingleContainer);
