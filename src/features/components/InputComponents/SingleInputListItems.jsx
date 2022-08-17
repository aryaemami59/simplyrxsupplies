import { Card, ListGroup } from "react-bootstrap";
import { memo } from "react";
import officialVendorNames from "../../../data/officialVendorNames.json";
import SearchResultsBarcodeImageComponent from "./SearchResultsBarcodeImageComponent";
import PropTypes from "prop-types";
import SearchResultsItemNameComponent from "./SearchResultsItemNameComponent";
import SearchResultsItemNumberComponent from "./SearchResultsItemNumberComponent";
import SwitchComponent from "./SwitchComponent";
import AddItemButtonComponent from "./AddItemButtonComponent";

function SingleInputListItems({ itemObj }) {
  return (
    <Card bg="dark" border="info" text="white">
      <Card.Body>
        <SearchResultsItemNameComponent
          itemObj={itemObj}
          key={`SearchResultsItemNameComponent-`}
        />
        <SearchResultsBarcodeImageComponent
          itemNumber={itemObj.itemNumber}
          src={itemObj.src}
          key={`${itemObj.name}-BarcodeImageComponent-inputListItem`}
        />
        <AddItemButtonComponent
          itemObj={itemObj}
          key={`AddItemButtonComponent-`}
        />
        <ListGroup>
          <SearchResultsItemNumberComponent
            itemObj={itemObj}
            key={`SearchResultsItemNumberComponent-${itemObj.name}-${itemObj.itemNumber}`}
          />
          <h5 variant="dark">Available on:</h5>
          {itemObj.vendors.map(e => (
            <SwitchComponent
              key={`SwitchComponent-${itemObj.name}${e}`}
              itemObj={itemObj}
              officialVendorName={officialVendorNames[e]}
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
