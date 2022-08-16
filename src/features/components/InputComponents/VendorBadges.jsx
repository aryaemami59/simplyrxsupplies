import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { memo } from "react";
import PropTypes from "prop-types";
import SwitchComponent from "./SwitchComponent";
import { ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

function VendorBadges({
  vendorName,
  itemObj,
  officialVendorName,
  clickHandler,
}) {
  const ifAdded = useSelector(
    state => !state.item[itemObj.name].includes(vendorName)
  );

  return (
    <>
      {/* <Form.Control
        type="button"
        placeholder="Username"
        aria-describedby="inputGroupPrepend"
        name="username"
        isInvalid={ifAdded}
      /> */}
      {/* <Form.Control.Feedback type="invalid" tooltip>
        This Item Has Already Been Added
      </Form.Control.Feedback> */}
      <Button
        size="sm"
        onClick={clickHandler}
        className="w-100"
        variant={!ifAdded ? "info text-white" : "outline-info"}
        key={`${itemObj.name}-Badge-VendorBadges-`}>
        {officialVendorName}
      </Button>
    </>
  );
}

VendorBadges.propTypes = {
  vendorName: PropTypes.string,
  officialVendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(VendorBadges);
