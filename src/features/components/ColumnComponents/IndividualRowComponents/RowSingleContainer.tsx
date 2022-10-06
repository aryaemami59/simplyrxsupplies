import { Button, ButtonGroup, Collapse, Fade } from "@mui/material";
import { FC, KeyboardEvent, memo, useCallback, useState } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import MinimizeButton from "./MinimizeButton";
import RowSingleContainerModal from "./ModalComponents/RowSingleContainerModal";
import RowRemoveButton from "./RowRemoveButton";
import RowSingleItemInfo from "./RowSingleItemInfo";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowSingleContainer: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
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
      key={`div-SingleVendorColumnListItem-${vendorName}-${name}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded border mb-4">
      <div
        key={`Container-SingleVendorColumnListItem-${vendorName}-${name}`}
        className="my-3 container-fluid">
        <div
          key={`Row-SingleVendorColumnListItem-${vendorName}-${name}`}
          className="justify-content-evenly align-items-center row">
          <div
            key={`Col-SingleVendorColumnListItem-${vendorName}-${name}-first`}
            className="col-12 col-xl-7 col-xxl-9">
            <Fade
              key={`Fade-SingleVendorColumnListItem-${vendorName}-${name}`}
              in={!open}
              unmountOnExit>
              <Button
                key={`Button-SingleVendorColumnListItem-${vendorName}-${name}`}
                aria-controls="maximize content"
                variant="contained"
                className="w-100"
                onClick={toggleFade}>
                {name}
              </Button>
            </Fade>
          </div>
          <div
            key={`Col-SingleVendorColumnListItem-${vendorName}-${name}-second`}
            className="col-xs-auto">
            <ButtonGroup
              key={`ButtonGroup-SingleVendorColumnListItem-${vendorName}-${name}`}
              className="my-2">
              <RowSingleContainerModal
                itemObj={itemObj}
                vendorName={vendorName}
              />
              <MinimizeButton
                key={`MinimizeButton-SingleVendorColumnListItem-${vendorName}-${name}`}
                open={open}
                toggle={toggleFade}
                vendorName={vendorName}
                itemObj={itemObj}
              />
              <RowRemoveButton
                vendorName={vendorName}
                itemObj={itemObj}
                key={`RemoveButton-SingleVendorColumnListItem-${vendorName}-${name}`}
              />
            </ButtonGroup>
          </div>
        </div>
      </div>
      <Collapse
        key={`Collapse-SingleVendorColumnListItem-${vendorName}-${name}`}
        in={open}>
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
