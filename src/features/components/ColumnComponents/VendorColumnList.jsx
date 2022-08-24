import VendorColumn from "./VendorColumn";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { selectVendorsArr } from "../../../addedSlice";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../data/store";
const VendorColumnList = () => {
    const vendors = useAppSelector(selectVendorsArr, shallowEqual);
    return (<Row className="justify-content-center">
      <Col xs={11} lg={11} xl={10} className="shadow p-0 justify-content-center text-center">
        {vendors.map((e) => (<VendorColumn key={`${e}-VendorColumn`} vendorName={e}/>))}
      </Col>
    </Row>);
};
export default memo(VendorColumnList);
