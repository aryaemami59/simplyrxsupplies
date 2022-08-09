import {
  Button,
  Collapse,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Container,
  Tooltip,
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
  // const { item, id } = props;
  // const [tooltipOpen, setTooltipOpen] = useState(false);

  // const toggle = () => setTooltipOpen(prev => !prev);

  // const copyItemName = (e, text) => {
  //   toggle();
  //   navigator.clipboard.writeText(text);
  //   setTimeout(toggle, 800);
  // };

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
            <QRCodeImageComponent vendorName={vendorName} />
            <ListGroup>
              {addedItems.map((e, i) => (
                <Container
                  color="danger"
                  className="bg-secondary p-4"
                  key={`${e.name}${vendorName}-VendorColumn-Container-name`}>
                  <RemoveButton vendorName={vendorName} itemObj={e} />
                  <ItemNameComponent
                    id={"Tooltip-" + i}
                    vendorName={vendorName}
                    itemObj={e}
                  />
                  <ItemNumberComponent
                    id={"Tooltip-" + e.itemNumber}
                    vendorName={vendorName}
                    itemObj={e}
                  />
                  {/* <ListGroupItem
                    id={"Tooltip-" + i}
                    role="button"
                    onClick={ev => copyItemName(ev, e.name)}
                    color="success"
                    key={`${e.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
                    Item Name: {e.name}
                  </ListGroupItem> */}
                  {/* <Tooltip isOpen={tooltipOpen} target={"Tooltip-" + i}>
                    Copied Item Name!
                  </Tooltip> */}
                  {/* <ListGroupItem
                    color="primary"
                    key={`${e.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-number`}>
                    Item Number: {e.itemNumber}
                  </ListGroupItem> */}
                  <ColumnBarcodeImageComponent
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
