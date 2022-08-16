import { memo, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import officialVendorNames from "../../../data/officialVendorNames.json";
import SearchResultsBarcodeImageComponent from "./SearchResultsBarcodeImageComponent";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import SearchResultsItemNameComponent from "./SearchResultsItemNameComponent";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import SearchResultsItemNumberComponent from "./SearchResultsItemNumberComponent";
import SwitchComponent from "./SwitchComponent";
import { Overlay } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { checkIfAddedToAllVendors } from "../../../addedSlice";
import { Badge } from "react-bootstrap";
import { Fade } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Collapse } from "react-bootstrap";

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
    // IfAddedToAllVendors
    //   ? setShow(true) && setTimeout(() => setShow(prev => !prev), 500)
    //   : dispatch(addItems({ itemObj, vendors }));
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
          className="btn btn-success d-block w-100 position-relative">
          Add Item
          <Collapse in={show} timeout={1000}>
            <div>
              <Fade in={show} timeout={1000}>
                <Badge bg="danger" className="d-block">
                  This Item Has Already Been Added
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

// const mapStateToProps = (state, ownProps) => {
//   return {
//     myVendors: state.item[ownProps.itemObj.name],
//   };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     clickHandler: () => {
//       dispatch(
//         addItems({
//           itemObj: ownProps.itemObj,
//           vendors: ownProps.myVendors,
//         })
//       );
//     },
//   };
// };

// export default memo(
//   connect(mapStateToProps, mapDispatchToProps)(SingleInputListItems)
// );
export default memo(SingleInputListItems);
