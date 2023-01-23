import { Button, ButtonGroup, Collapse, Fade } from "@mui/material";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import useItemName from "../../../hooks/useItemName";
import CollapseButton from "./CollapseButton";
import RowSingleContainerModal from "./ModalComponents/RowSingleContainerModal";
import RowDeleteButton from "./RowDeleteButton";
import RowSingleItemInfo from "./RowSingleItemInfo";

type Props = {
  toggleCollapse: () => void;
  allCollapsed: boolean;
};

const RowSingleContainer: FC<Props> = ({ allCollapsed, toggleCollapse }) => {
  const itemName = useItemName();
  const [open, setOpen] = useState(true);

  const toggleFade = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

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
                allCollapsed={allCollapsed}
                toggle={toggleFade}
              />
              <RowDeleteButton />
            </ButtonGroup>
          </div>
          <div className="col-12 col-xl-7 col-xxl-9">
            <Fade
              // in={!open}
              in={!open || !allCollapsed}
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
      <Collapse in={open && allCollapsed}>
        <div>
          <RowSingleItemInfo />
        </div>
      </Collapse>
    </div>
  );
};

export default memo<Props>(RowSingleContainer);
