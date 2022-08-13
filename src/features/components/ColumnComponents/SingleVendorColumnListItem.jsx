import {
  Collapse,
  Button,
  Row,
  Col,
  Fade,
  ButtonGroup,
  Container,
} from "react-bootstrap";
import { memo, useCallback, useState } from "react";
import RemoveButton from "./RemoveButton";
import ItemNameComponent from "./ItemNameComponent";
import ItemNumberComponent from "./ItemNumberComponent";
import ColumnBarcodeImageComponent from "./ColumnBarcodeImageComponent";
import MinimizeButton from "./MinimizeButton";
import PropTypes from "prop-types";

function SingleVendorColumnListItem({
  itemObj,
  vendorName,
  officialVendorName,
}) {
  const [open, setOpen] = useState(true);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleKeyDown = useCallback(
    e => {
      if (e.key === "c") {
        toggle();
      }
    },
    [toggle]
  );

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded shadow border mb-4 shadow">
      <Container fluid className="my-3">
        <Row className="justify-content-evenly align-items-center">
          <Col xs={12} xl={7} xxl={9} className="">
            <Fade in={!open} unmountOnExit>
              <Button
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
              <RemoveButton
                vendorName={vendorName}
                itemObj={itemObj}
                key={`${itemObj.name}-${vendorName}-RemoveButton`}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Collapse in={open}>
        <Container
          className="custom-bg-color-2"
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
