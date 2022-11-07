import { FC, memo } from "react";
import VendorNameProvider from "../../contexts/VendorNameProvider";
import useVendorNamesList from "../../hooks/useVendorNamesList";
import OffcanvasVendorAccordion from "./OffcanvasVendorAccordion";

const OffcanvasVendorAccordionList: FC = () => {
  const vendorNames = useVendorNamesList();

  return (
    <>
      {vendorNames.map(vendorName => (
        <VendorNameProvider
          key={vendorName}
          vendorName={vendorName}>
          <OffcanvasVendorAccordion
            key={`${vendorName}-OffcanvasVendorAccordionList`}
          />
        </VendorNameProvider>
      ))}
    </>
  );
};

export default memo(OffcanvasVendorAccordionList);
