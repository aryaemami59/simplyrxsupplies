import { Collapse } from "@mui/material";
import Button from "@mui/material/Button";
import { FC, memo, useCallback, useState } from "react";
import { shallowEqual } from "react-redux";
import { VendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import {
  selectAddedItemsByVendor,
  selectVendorOfficialName,
} from "../../../Redux/selectors";
import RowCounterBadge from "./IndividualRowComponents/RowCounterBadge";
import VendorColumnCard from "./VendorColumnCard";

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
        mountOnEnter
        unmountOnExit
        in={open}>
        <div>
          <VendorColumnCard
            officialVendorName={officialVendorName}
            addedItems={addedItems}
            vendorName={vendorName}
          />
        </div>
      </Collapse>
    </>
  );
};

export default memo<Props>(VendorColumn);
