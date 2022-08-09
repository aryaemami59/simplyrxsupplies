import {
  Button,
  Collapse,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Container,
} from "reactstrap";
import { useState, memo, useCallback, useRef } from "react";
import BadgeComponent from "./BadgeComponent";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectByVendor } from "../../../addedSlice";
import RemoveButton from "./RemoveButton";
import BarcodeImageComponent from "../InputComponents/BarcodeImageComponent";
// import { connect } from "react-redux";

function VendorColumn({ officialVendorName, vendorName }) {
  const [open, setOpen] = useState(() => false);
  const nodeRef = useRef(null);

  const addedItems = useSelector(selectByVendor(vendorName));
  const buttonClick = useCallback(() => {
    return setOpen(!open);
  }, [open]);

  return (
    <div>
      <Button
        className="position-relative"
        color="primary"
        onClick={buttonClick}
        key={`${officialVendorName}-VendorColumn-Button`}
        block>
        {officialVendorName}
        <BadgeComponent
          vendorName={vendorName}
          key={`${officialVendorName}-VendorColumn-Badge`}
        />
      </Button>
      <Collapse isOpen={open}>
        <Card>
          <CardBody>
            <ListGroup>
              {addedItems.map((e, i) => (
                <Container
                  color="danger"
                  className="bg-secondary p-4"
                  key={`${e.name}-${vendorName}-VendorColumn-Container-name`}>
                  <RemoveButton vendorName={vendorName} itemObj={e} />
                  <ListGroupItem
                    color="success"
                    key={`${e.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
                    Item Name: {e.name}
                  </ListGroupItem>
                  <ListGroupItem
                    color="primary"
                    key={`${e.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-number`}>
                    Item Number: {e.itemNumber}
                  </ListGroupItem>
                  <BarcodeImageComponent
                    src={e.src}
                    itemNumber={e.itemNumber}
                  />
                </Container>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

VendorColumn.propTypes = {
  officialVendorName: PropTypes.string,
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  vendorName: PropTypes.string,
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     addedItems: state.added[ownProps.vendorName],
//   };
// };

export default memo(VendorColumn);
