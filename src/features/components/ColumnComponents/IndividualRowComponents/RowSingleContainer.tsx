import { Button, ButtonGroup, Collapse, Fade } from "@mui/material";
import { FC, KeyboardEvent, memo, useCallback, useState } from "react";
import { VendorAndItemName } from "../../../../customTypes/types";
import CollapseButton from "./CollapseButton";
import RowSingleContainerModal from "./ModalComponents/RowSingleContainerModal";
import RowDeleteButton from "./RowDeleteButton";
import RowSingleItemInfo from "./RowSingleItemInfo";

// type Props = {
//   itemName: ItemName;
//   vendorName: VendorNameType;
// };

type Props = VendorAndItemName;

const RowSingleContainer: FC<Props> = ({ itemName, vendorName }) => {
  const [open, setOpen] = useState(true);
  // const { name } = itemObj;

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
          <div className="col-xs-auto justify-content-center d-flex">
            <ButtonGroup className="flex-wrap justify-content-center">
              <RowSingleContainerModal
                itemName={itemName}
                vendorName={vendorName}
              />
              <CollapseButton
                open={open}
                toggle={toggleFade}
                // vendorName={vendorName}
                // itemName={itemName}
              />
              <RowDeleteButton
                vendorName={vendorName}
                itemName={itemName}
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
                {itemName}
              </Button>
            </Fade>
          </div>
        </div>
      </div>
      <Collapse in={open}>
        <div>
          <RowSingleItemInfo
            itemName={itemName}
            vendorName={vendorName}
          />
        </div>
      </Collapse>
    </div>
  );
};

export default memo<Props>(RowSingleContainer);
