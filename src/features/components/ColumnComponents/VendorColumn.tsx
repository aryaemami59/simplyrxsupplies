import { Collapse } from "@mui/material";
import Button from "@mui/material/Button";
import { FC, KeyboardEvent, memo, useCallback, useState } from "react";
import { shallowEqual } from "react-redux";
import { VendorNameType } from "../../../customTypes/types";
import { selectVendorOfficialName } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import RowCounterBadge from "./IndividualRowComponents/RowCounterBadge";
import VendorColumnCard from "./VendorColumnCard";
import { selectAddedItemsByVendor } from "../../../Redux/addedSlice";

type Props = {
  vendorName: VendorNameType;
};

const VendorColumn: FC<Props> = ({ vendorName }) => {
  const [open, setOpen] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const addedItems = useAppSelector(
    selectAddedItemsByVendor(vendorName),
    shallowEqual
  );

  const buttonClick = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "m") {
        buttonClick();
      }
    },
    [buttonClick]
  );

  return (
    <>
      <Button
        className="position-relative d-block w-100"
        variant="contained"
        onClick={buttonClick}>
        {officialVendorName}
        <RowCounterBadge vendorName={vendorName} />
      </Button>
      <Collapse
        // enter
        mountOnEnter
        unmountOnExit
        // appear
        in={open}>
        <div>
          <VendorColumnCard
            officialVendorName={officialVendorName}
            addedItems={addedItems}
            handleKeyDown={handleKeyDown}
            vendorName={vendorName}
          />
        </div>
      </Collapse>
    </>
  );
};

export default memo<Props>(VendorColumn);
