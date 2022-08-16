import {
  Card,
  ListGroup,
  Badge,
  Fade,
  Button,
  Collapse,
} from "react-bootstrap";
import { memo, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addItems, checkIfAddedToAllVendors } from "../../../addedSlice";
import officialVendorNames from "../../../data/officialVendorNames.json";
import SearchResultsBarcodeImageComponent from "./SearchResultsBarcodeImageComponent";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SearchResultsItemNameComponent from "./SearchResultsItemNameComponent";
import SearchResultsItemNumberComponent from "./SearchResultsItemNumberComponent";
import SwitchComponent from "./SwitchComponent";

function SingleInputListItems({ itemObj }) {
  const IfAddedToAllVendors = useSelector(checkIfAddedToAllVendors(itemObj));
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const target = useRef(null);

  const vendors = useSelector(state => state.item[itemObj.name]);

  const clickHandler = useCallback(() => {
    if (IfAddedToAllVendors) {
      setShow(true);
      setTimeout(() => setShow(false), 1500);
    } else {
      dispatch(addItems({ itemObj, vendors }));
    }
  }, [dispatch, itemObj, vendors, IfAddedToAllVendors]);

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
        <Button
          ref={target}
          size="lg"
          key={`${itemObj.name}-badge`}
          onClick={clickHandler}
          className="btn btn-success d-block w-100 position-relative mb-2 fw-bold">
          Add Item
          <Collapse in={show} timeout={500}>
            <div>
              <Fade in={show} timeout={500}>
                <Badge bg="danger" className="d-block fw-light">
                  This Item Has Already Been Added!
                </Badge>
              </Fade>
            </div>
          </Collapse>
        </Button>
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
