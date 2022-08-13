import VendorColumn from "./VendorColumn";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";

function VendorColumnList() {
  return (
    <Row className="justify-content-start">
      <Col lg={12} xl={10} className="shadow p-0">
        {vendors.map(e => (
          <VendorColumn
            officialVendorName={officialVendorNames[e]}
            key={`${officialVendorNames[e]}-VendorColumn`}
            vendorName={e}
          />
        ))}
      </Col>
    </Row>
  );
}

export default memo(VendorColumnList);
