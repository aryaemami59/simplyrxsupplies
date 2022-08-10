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
          className="float-end"
          vendorName={vendorName}
          key={`${officialVendorName}-VendorColumn-Badge`}
        />
      </Button>
      <Collapse isOpen={open}>
        <Card>
          <CardBody className="bg-dark bg-gradient">
            <QRCodeImageComponent vendorName={vendorName} />
            <ListGroup>
              {addedItems.map((e, i) => (
                <Container
                  color="danger"
                  className="bg-secondary p-0"
                  key={`${e.name}${vendorName}-VendorColumn-Container-name`}>
                  <RemoveButton vendorName={vendorName} itemObj={e} />
                  <ItemNameComponent
                    id={nodeRef}
                    vendorName={vendorName}
                    itemObj={e}
                  />
                  <ItemNumberComponent
                    id={"Tooltip-" + e.itemNumber}
                    vendorName={vendorName}
                    itemObj={e}
                  />
                  <ColumnBarcodeImageComponent
                    src={e.src}
                    itemNumber={e.itemNumber}
                    itemObj={e}
                    vendorName={vendorName}
                    officialVendorName={officialVendorName}
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
