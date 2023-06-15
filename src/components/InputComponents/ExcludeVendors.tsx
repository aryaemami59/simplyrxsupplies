import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import type { FC } from "react";
import { memo } from "react";

import VendorNameProvider from "../../contexts/VendorNameProvider";
import useVendorNamesList from "../../hooks/useVendorNamesList";
import ExcludeVendorSingleCheckbox from "./ExcludeVendorSingleCheckbox";

const ExcludeVendors: FC = () => {
  const vendorNames = useVendorNamesList();

  return (
    <>
      <Button
        className="mt-3"
        variant="contained">
        Exclude Vendors
      </Button>
      <ButtonGroup
        size="small"
        // orientation="vertical"
        // fullWidth
        // className="px-5"
      >
        {vendorNames.map(vendorName => (
          <VendorNameProvider
            vendorName={vendorName}
            key={vendorName}>
            <ExcludeVendorSingleCheckbox />
            {/* <FormControlLabel
              className="fs-7"
              disableTypography
              label={vendorName}
              control={<ExcludeVendorSingleCheckbox vendorName={vendorName} />}
            /> */}
            {/* <Button
              variant="contained"
              key={`${vendorName}-VendorColumn`}>
              {vendorName}
            </Button> */}
          </VendorNameProvider>
        ))}
      </ButtonGroup>
    </>
  );
};

export default memo(ExcludeVendors);
