import { Card, ListGroup } from "react-bootstrap";
import { memo } from "react";
import SearchResultsBarcodeImageComponent from "./SearchResultsBarcodeImageComponent";
import SearchResultsItemNameComponent from "./SearchResultsItemNameComponent";
import SearchResultsItemNumberComponent from "./SearchResultsItemNumberComponent";
import SwitchComponent from "./SwitchComponent";
import AddItemButtonComponent from "./AddItemButtonComponent";
import PropTypes from "prop-types";

function SingleInputListItems({ itemObj }) {
  return (
    <Card
      bg="dark"
      border="info"
      text="white"
      key={`Card-SingleInputListItems`}>
      <Card.Body key={`Card.Body-SingleInputListItems`}>
        <SearchResultsItemNameComponent
          itemObj={itemObj}
          key={`SearchResultsItemNameComponent-SingleInputListItems`}
        />
        <SearchResultsBarcodeImageComponent
          itemObj={itemObj}
          key={`SearchResultsBarcodeImageComponent-SingleInputListItems`}
        />
        <AddItemButtonComponent
          itemObj={itemObj}
          key={`AddItemButtonComponent-SingleInputListItems`}
        />
        <ListGroup key={`ListGroup-SingleInputListItems`}>
          <SearchResultsItemNumberComponent
            itemObj={itemObj}
            key={`SearchResultsItemNumberComponent-${itemObj.name}-${itemObj.itemNumber}`}
          />
          <h5 key={`h5-SingleInputListItems`} variant="dark">
            Available on:
          </h5>
          {itemObj.vendors.map(e => (
            <SwitchComponent
              key={`SwitchComponent-${itemObj.name}${e}`}
              itemObj={itemObj}
              vendorName={e}
            />
          ))}
        </ListGroup>
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
