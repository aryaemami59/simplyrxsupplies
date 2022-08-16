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
import { addItems } from "../../../addedSlice";
import officialVendorNames from "../../../data/officialVendorNames.json";
import SearchResultsBarcodeImageComponent from "./SearchResultsBarcodeImageComponent";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SearchResultsItemNameComponent from "./SearchResultsItemNameComponent";
import SearchResultsItemNumberComponent from "./SearchResultsItemNumberComponent";
import SwitchComponent from "./SwitchComponent";
import { checkIfAddedToAllVendors } from "../../../addedSlice";

function SingleInputListItems({ itemObj }) {
  const IfAddedToAllVendors = useSelector(checkIfAddedToAllVendors(itemObj));
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const target = useRef(null);

  const vendors = useSelector(state => state.item[itemObj.name]);

  const clickHandler = useCallback(() => {
    if (IfAddedToAllVendors) {
      setShow(true);
      setTimeout(() => setShow(false), 2000);
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
          className="btn btn-success d-block w-100 position-relative mb-2">
          Add Item
          <Collapse in={show} timeout={1000}>
            <div>
              <Fade in={show} timeout={1000}>
                <Badge bg="danger" className="d-block">
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
