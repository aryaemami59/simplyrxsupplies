import {
  Button,
  Collapse,
  Card,
  CardBody,
  ListGroup,
  Container,
} from "reactstrap";
import { useState, memo, useCallback, useRef } from "react";
import BadgeComponent from "./BadgeComponent";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectByVendor } from "../../../addedSlice";
import RemoveButton from "./RemoveButton";
import ColumnBarcodeImageComponent from "./ColumnBarcodeImageComponent";
import QRCodeImageComponent from "./QRCodeImageComponent";
import ItemNameComponent from "./ItemNameComponent";
import ItemNumberComponent from "./ItemNumberComponent";

function VendorColumn({ officialVendorName, vendorName }) {
  const [open, setOpen] = useState(() => false);

  const addedItems = useSelector(selectByVendor(vendorName));
  const buttonClick = useCallback(() => {
    return setOpen(!open);
  }, [open]);

  const nodeRef = useRef(null);

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
          nodeRef={nodeRef}
          vendorName={vendorName}
          key={`${officialVendorName}-VendorColumn-Badge`}
        />
      </Button>
      <Collapse isOpen={open} nodeRef={nodeRef}>
        <Card nodeRef={nodeRef}>
          <CardBody nodeRef={nodeRef}>
            <QRCodeImageComponent nodeRef={nodeRef} vendorName={vendorName} />
            <ListGroup nodeRef={nodeRef}>
              {addedItems.map((e, i) => (
                <Container
                  nodeRef={nodeRef}
                  color="danger"
                  className="bg-secondary p-4"
                  key={`${e.name}${vendorName}-VendorColumn-Container-name`}>
                  <RemoveButton
                    nodeRef={nodeRef}
                    vendorName={vendorName}
                    itemObj={e}
                  />
                  <ItemNameComponent
                    nodeRef={nodeRef}
                    id={"Tooltip-" + i}
                    vendorName={vendorName}
                    itemObj={e}
                  />
                  <ItemNumberComponent
                    nodeRef={nodeRef}
                    id={"Tooltip-" + e.itemNumber}
                    vendorName={vendorName}
                    itemObj={e}
                  />
                  <ColumnBarcodeImageComponent
                    nodeRef={nodeRef}
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
