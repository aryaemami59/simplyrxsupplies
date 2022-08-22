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

function SingleVendorColumnListItem({ itemObj, vendorName }) {
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
      key={`div-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded shadow border mb-4 shadow">
      <Container
        key={`Container-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
        fluid
        className="my-3">
        <Row
          key={`Row-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
          className="justify-content-evenly align-items-center">
          <Col
            key={`Col-SingleVendorColumnListItem-${vendorName}-${itemObj.name}-first`}
            xs={12}
            xl={7}
            xxl={9}
            className="">
            <Fade
              key={`Fade-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
              in={!open}
              unmountOnExit>
              <Button
                key={`Button-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
                aria-controls="maximize content"
                variant="success"
                className="w-100"
                onClick={toggle}>
                {itemObj.name}
              </Button>
            </Fade>
          </Col>
          <Col
            key={`Col-SingleVendorColumnListItem-${vendorName}-${itemObj.name}-second`}
            className=""
            xs={"auto"}>
            <ButtonGroup
              key={`ButtonGroup-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
              className="my-2">
              <MinimizeButton
                key={`MinimizeButton-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
                open={open}
                toggle={toggle}
                vendorName={vendorName}
                itemObj={itemObj}
              />
              <RemoveButton
                vendorName={vendorName}
                itemObj={itemObj}
                key={`RemoveButton-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Collapse
        key={`Collapse-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}
        in={open}>
        <Container
          // className={"custom-bg-color-2"}
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
            itemObj={itemObj}
            vendorName={vendorName}
            key={`${itemObj.name}-${vendorName}-ColumnBarcodeImageComponent`}
          />
        </Container>
      </Collapse>
    </div>
  );
}

PropTypes.propTypes = {
  vendorName: PropTypes.string,
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
