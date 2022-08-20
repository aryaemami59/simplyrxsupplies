import VendorColumn from "./VendorColumn";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { selectVendorsArr } from "../../../addedSlice";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";

function VendorColumnList() {
  const vendors = useSelector(selectVendorsArr, shallowEqual);

  return (
    <Row className="justify-content-center">
      <Col
        xs={12}
        lg={12}
        xl={10}
        className="shadow p-0 justify-content-center text-center">
        {vendors.map(e => (
          <VendorColumn key={`${e}-VendorColumn`} vendorName={e} />
        ))}
      </Col>
    </Row>
  );
}

export default memo(VendorColumnList);
