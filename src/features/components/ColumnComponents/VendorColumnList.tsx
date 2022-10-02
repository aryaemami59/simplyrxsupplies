import { FC, memo } from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { selectVendorsArr } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import VendorColumn from "./VendorColumn";

const VendorColumnList: FC = (): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr, shallowEqual);

  return (
    <Row className="justify-content-center">
      <Col
        xs={11}
        lg={11}
        xl={10}
        className="shadow p-0 justify-content-center text-center">
        {vendors.map(vendorName => (
          <VendorColumn
            key={`${vendorName}-VendorColumn`}
            vendorName={vendorName}
          />
        ))}
      </Col>
    </Row>
  );
};

export default memo(VendorColumnList);
