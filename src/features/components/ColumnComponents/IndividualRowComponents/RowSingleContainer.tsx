import { Button, ButtonGroup, Collapse, Fade } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import useItemName from "../../../customHooks/useItemName";
import CollapseButton from "./CollapseButton";
import RowSingleContainerModal from "./ModalComponents/RowSingleContainerModal";
import RowDeleteButton from "./RowDeleteButton";
import RowSingleItemInfo from "./RowSingleItemInfo";

const RowSingleContainer: FC = () => {
  const itemName = useItemName();
  const [open, setOpen] = useState(true);

  const toggleFade = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div className="rounded border mb-4">
      <div className="my-3 container-fluid">
        <div className="justify-content-evenly align-items-center row">
          <div className="col-xs-auto justify-content-center d-flex">
            <ButtonGroup className="flex-wrap justify-content-center">
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
              in={!open}
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
      <Collapse in={open}>
        <div>
          <RowSingleItemInfo />
        </div>
      </Collapse>
    </div>
  );
};

export default memo(RowSingleContainer);
