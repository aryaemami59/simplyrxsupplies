import { FC, memo } from "react";
import VendorNameProvider from "../../contexts/VendorNameProvider";
import useVendorNamesList from "../../customHooks/useVendorNamesList";
import OffcanvasVendorAccordion from "./OffcanvasVendorAccordion";

const OffcanvasVendorAccordionList: FC = () => {
  const vendorNames = useVendorNamesList();

  return (
    <>
      {vendorNames.map(vendorName => (
        <VendorNameProvider vendorName={vendorName}>
          <OffcanvasVendorAccordion
            key={`${vendorName}-OffcanvasVendorAccordionList`}
          />
        </VendorNameProvider>
      ))}
    </>
  );
};

export default memo(OffcanvasVendorAccordionList);
