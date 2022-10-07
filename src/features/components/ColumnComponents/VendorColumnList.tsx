import { FC, memo } from "react";
import { shallowEqual } from "react-redux";
import { selectVendorsArr } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import Col from "./IndividualRowComponents/Col";
import VendorColumn from "./VendorColumn";

const VendorColumnList: FC = () => {
  const vendors = useAppSelector(selectVendorsArr, shallowEqual);

  return (
    <div className="justify-content-center row">
      <Col
        xs={11}
        xl={10}
        className="p-0 shadow"
        // className="shadow justify-content-center text-center bg-light"
      >
        {vendors.map(vendorName => (
          <VendorColumn
            key={`${vendorName}-VendorColumn`}
            vendorName={vendorName}
          />
        ))}
      </Col>
      {/* <div className="shadow col-11 col-xl-10 p-0 justify-content-center text-center bg-light"> */}
      {/* </div> */}
    </div>
  );
};

export default memo(VendorColumnList);
