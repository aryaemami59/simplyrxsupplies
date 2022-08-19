import { Card, ListGroup } from "react-bootstrap";
import { memo } from "react";
import SearchResultsBarcodeImageComponent from "./SearchResultsBarcodeImageComponent";
import SearchResultsItemNameComponent from "./SearchResultsItemNameComponent";
import SearchResultsItemNumberComponent from "./SearchResultsItemNumberComponent";
import SwitchComponent from "./SwitchComponent";
import AddItemButtonComponent from "./AddItemButtonComponent";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

function SingleInputListItems({ itemObj }) {
  return (
    <Card
      className=""
      bg="dark"
      border="info"
      text="white"
      key={`Card-SingleInputListItems`}>
      <Card.Body
        key={`Card.Body-SingleInputListItems`}
        className="row gy-2  justify-content-evenl align-items-cente align-content-betwee">
        <Col xs={12}>
          <Row className="m-0">
            <SearchResultsItemNameComponent
              itemObj={itemObj}
              key={`SearchResultsItemNameComponent-SingleInputListItems`}
            />
          </Row>
        </Col>
        <Col xs={12}>
          <Row className="justify-content-center align-items-center m-0 ">
            <Col className="align-items-center justify-content-center">
              <Row className="justify-content-center m-0">
                {itemObj.vendors.map(e => (
                  <SwitchComponent
                    key={`SwitchComponent-${itemObj.name}${e}`}
                    itemObj={itemObj}
                    vendorName={e}
                  />
                ))}
              </Row>
            </Col>
            <Col>
              <SearchResultsBarcodeImageComponent
                itemObj={itemObj}
                key={`SearchResultsBarcodeImageComponent-SingleInputListItems`}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Row className="mx-0">
            <SearchResultsItemNumberComponent
              itemObj={itemObj}
              key={`SearchResultsItemNumberComponent-${itemObj.name}-${itemObj.itemNumber}`}
            />
          </Row>
        </Col>
        <Col xs={12}>
          <Row className="m-0">
            <AddItemButtonComponent
              itemObj={itemObj}
              key={`AddItemButtonComponent-SingleInputListItems`}
            />
          </Row>
        </Col>
        {/* <ListGroup key={`ListGroup-SingleInputListItems`}> */}
        {/* <h5 key={`h5-SingleInputListItems`} variant="dark">
            Available on:
          </h5> */}
        {/* </ListGroup> */}
      </Card.Body>
    </Card>
  );
}

SingleInputListItems.propTypes = {
  vendors: PropTypes.arrayOf(PropTypes.string),
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SingleInputListItems);
