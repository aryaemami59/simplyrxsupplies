import { FC, memo } from "react";
import { useAppSelector } from "../../../Redux/hooks";
import { selectVendorsArr } from "../../../Redux/selectors";
import OffcanvasVendorAccordion from "./OffcanvasVendorAccordion";

const OffcanvasVendorAccordionList: FC = () => {
  const vendorList = useAppSelector(selectVendorsArr);

  return (
    <>
      {vendorList.map(vendorName => (
        <OffcanvasVendorAccordion
          key={`${vendorName}-OffcanvasVendorAccordionList`}
          vendorName={vendorName}
        />
      ))}
    </>
  );
};

export default memo(OffcanvasVendorAccordionList);
