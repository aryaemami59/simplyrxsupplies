import { FC, memo } from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { selectVendorsArr } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import VendorColumn from "./VendorColumn";

const VendorColumnList: FC = (): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr, shallowEqual);

  return (
    <div className="justify-content-center row">
      <div className="shadow col-11 col-xl-10 p-0 justify-content-center text-center bg-light">
        {vendors.map(vendorName => (
          <VendorColumn
            key={`${vendorName}-VendorColumn`}
            vendorName={vendorName}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(VendorColumnList);
