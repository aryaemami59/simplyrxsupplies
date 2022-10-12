import { FC, memo } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../Redux/hooks";
import { selectVendorsArr } from "../../../Redux/selectors";
import VendorColumn from "./VendorColumn";

const VendorColumnList: FC = () => {
  const vendors = useAppSelector(selectVendorsArr, shallowEqual);

  return (
    <div className="justify-content-center row">
      {/* <Col
        xs={11}
        xl={10}
      className="p-0 shadow"> */}
      <div className="shadow col-11 col-xl-10 p-0 justify-content-center text-center">
        {vendors.map(vendorName => (
          <VendorColumn
            key={`${vendorName}-VendorColumn`}
            vendorName={vendorName}
          />
        ))}
      </div>
      {/* </Col> */}
    </div>
  );
};

export default memo(VendorColumnList);
