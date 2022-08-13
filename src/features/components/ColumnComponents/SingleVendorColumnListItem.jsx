import Container from "react-bootstrap/Container";
import RemoveButton from "./RemoveButton";
import ItemNameComponent from "./ItemNameComponent";
import ItemNumberComponent from "./ItemNumberComponent";
import ColumnBarcodeImageComponent from "./ColumnBarcodeImageComponent";
import { memo, useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Fade } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup } from "react-bootstrap";
import { Overlay } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import MinimizeButton from "./MinimizeButton";

const EXPAND = "Expand";
const COLLAPSE = "Collapse";

function SingleVendorColumnListItem({
  itemObj,
  vendorName,
  officialVendorName,
}) {
  const [open, setOpen] = useState(true);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);
  // const [show, setShow] = useState(false);
  // const target = useRef(null);
  // const openTooltip = useCallback(() => {
  //   setShow(true);
  // }, []);

  // const closeTooltip = useCallback(() => {
  //   setShow(false);
  // }, []);

  return (
    <div className="rounded shadow border-5 border">
      <Container fluid className="my-3">
        <Row className="justify-content-evenly align-items-center">
          <Col xs={12} xl={7} xxl={9} className="">
            <Fade in={!open} unmountOnExit={true}>
              <Button
                aria-expanded={open}
                aria-controls="maximize content"
                variant="success"
                className="w-100"
                onClick={toggle}>
                {itemObj.name}
              </Button>
            </Fade>
          </Col>
          <Col className="" xs={"auto"}>
            <ButtonGroup className="my-2">
              <MinimizeButton
                open={open}
                toggle={toggle}
                vendorName={vendorName}
                itemObj={itemObj}
              />
              {/* <FontAwesomeIcon
                aria-label="collapse item info"
                ref={target}
                icon={open ? faMinus : faAdd}
                className="btn rounded-circle hover-inverse px-2 me-1"
                size="2xl"
                role="button"
                onMouseEnter={openTooltip}
                onMouseLeave={closeTooltip}
                onClick={toggle}
              />
              <Overlay
                key={`${vendorName}-RemoveButton-Overlay`}
                target={target.current}
                show={show}
                placement="top">
                {props => (
                  <Tooltip
                    key={`MinimizeButton-tooltip-${vendorName}-${itemObj.name}`}
                    id={`MinimizeButton-tooltip-${vendorName}-${itemObj.name}`}
                    {...props}>
                    Click Here to {open ? COLLAPSE : EXPAND} The Item Info
                  </Tooltip>
                )}
              </Overlay> */}
              <RemoveButton
                vendorName={vendorName}
                itemObj={itemObj}
                key={`${itemObj}-${vendorName}-RemoveButton`}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Collapse in={open}>
        <Container
          className="bg-secondary"
          key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
          <ItemNameComponent
            vendorName={vendorName}
            itemObj={itemObj}
            key={`${itemObj.name}-${vendorName}-ItemNameComponent`}
          />
          <ItemNumberComponent
            vendorName={vendorName}
            itemObj={itemObj}
            key={`${itemObj.name}-${vendorName}-ItemNumberComponent`}
          />
          <ColumnBarcodeImageComponent
            src={itemObj.src}
            itemNumber={itemObj.itemNumber}
            itemObj={itemObj}
            vendorName={vendorName}
            officialVendorName={officialVendorName}
            key={`${itemObj.name}-${vendorName}-ColumnBarcodeImageComponent`}
          />
        </Container>
      </Collapse>
    </div>
  );
}

PropTypes.propTypes = {
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

export default memo(SingleVendorColumnListItem);
