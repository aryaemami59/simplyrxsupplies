import { Button, ButtonGroup, Collapse, Fade } from "@mui/material";
import { FC, KeyboardEvent, memo, useCallback, useState } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import CollapseButton from "./CollapseButton";
import RowSingleContainerModal from "./ModalComponents/RowSingleContainerModal";
import RowRemoveButton from "./RowRemoveButton";
import RowSingleItemInfo from "./RowSingleItemInfo";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowSingleContainer: FC<Props> = ({ itemObj, vendorName }) => {
  const [open, setOpen] = useState(true);
  const { name } = itemObj;

  const toggleFade = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "c") {
        toggleFade();
      }
    },
    [toggleFade]
  );

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded border mb-4">
      <div className="my-3 container-fluid">
        <div className="justify-content-evenly align-items-center row">
          <div className="col-xs-auto">
            <ButtonGroup className="my-2">
              <RowSingleContainerModal
                itemObj={itemObj}
                vendorName={vendorName}
              />
              <CollapseButton
                open={open}
                toggle={toggleFade}
                vendorName={vendorName}
                itemObj={itemObj}
              />
              <RowRemoveButton
                vendorName={vendorName}
                itemObj={itemObj}
              />
            </ButtonGroup>
          </div>
          <div className="col-12 col-xl-7 col-xxl-9">
            <Fade
              in={!open}
              unmountOnExit>
              <Button
                aria-controls="maximize content"
                variant="contained"
                className="w-100"
                onClick={toggleFade}>
                {name}
              </Button>
            </Fade>
          </div>
        </div>
      </div>
      <Collapse in={open}>
        <div>
          <RowSingleItemInfo
            itemObj={itemObj}
            vendorName={vendorName}
          />
        </div>
      </Collapse>
    </div>
  );
};

export default memo<Props>(RowSingleContainer);
