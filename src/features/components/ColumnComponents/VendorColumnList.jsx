import VendorColumn from "./VendorColumn";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { selectVendorsObj, selectVendorsArr } from "../../../addedSlice";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";

function VendorColumnList() {
  const vendors = useSelector(selectVendorsArr, shallowEqual);
  const vendorsObj = useSelector(selectVendorsObj, shallowEqual);

  return (
    <Row className="justify-content-start">
      <Col lg={12} xl={10} className="shadow p-0">
        {vendors.map(e => (
          <VendorColumn
            officialVendorName={vendorsObj[e].officialName}
            key={`${vendorsObj[e].officialName}-VendorColumn`}
            vendorName={e}
          />
        ))}
      </Col>
    </Row>
  );
}

export default memo(VendorColumnList);
