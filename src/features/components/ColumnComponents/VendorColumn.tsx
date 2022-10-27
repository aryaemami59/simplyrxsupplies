import { Collapse } from "@mui/material";
import Button from "@mui/material/Button";
import { FC, memo, useCallback, useState } from "react";
import useOfficialVendorName from "../../customHooks/useOfficialVendorName";
import useVendorName from "../../customHooks/useVendorName";
import RowCounterBadge from "./IndividualRowComponents/RowCounterBadge";
import VendorColumnCard from "./VendorColumnCard";

const VendorColumn: FC = () => {
  const vendorName = useVendorName();
  const [open, setOpen] = useState(false);
  const officialVendorName = useOfficialVendorName(vendorName);

  const buttonClick = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <>
      <Button
        className="d-block w-100"
        variant="contained"
        onClick={buttonClick}>
        {officialVendorName}
        <RowCounterBadge />
      </Button>
      <Collapse
        // mountOnEnter
        // unmountOnExit
        in={open}>
        <div>
          <VendorColumnCard />
        </div>
      </Collapse>
    </>
  );
};

export default memo(VendorColumn);
