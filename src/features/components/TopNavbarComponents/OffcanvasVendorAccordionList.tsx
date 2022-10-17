import { FC, memo } from "react";
import useVendorNamesList from "../../customHooks/useVendorNamesList";
import OffcanvasVendorAccordion from "./OffcanvasVendorAccordion";

const OffcanvasVendorAccordionList: FC = () => {
  const vendorNames = useVendorNamesList();

  return (
    <>
      {vendorNames.map(vendorName => (
        <OffcanvasVendorAccordion
          key={`${vendorName}-OffcanvasVendorAccordionList`}
          vendorName={vendorName}
        />
      ))}
    </>
  );
};

export default memo(OffcanvasVendorAccordionList);
