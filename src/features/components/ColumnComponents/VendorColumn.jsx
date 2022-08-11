import { Button, Collapse, Card, CardBody, ListGroup } from "reactstrap";
import { useState, memo, useCallback, useRef } from "react";
import BadgeComponent from "./BadgeComponent";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectByVendor } from "../../../addedSlice";
import QRCodeImageComponent from "./QRCodeImageComponent";
import SingleVendorColumnListItem from "./SingleVendorColumnListItem";

function VendorColumn({ officialVendorName, vendorName }) {
  const [open, setOpen] = useState(false);

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
              {addedItems.map(e => (
                <SingleVendorColumnListItem
                  itemObj={e}
                  vendorName={vendorName}
                  officialVendorName={officialVendorName}
                  key={`${e.name}-${vendorName}-SingleVendorColumnListItem`}
                />
                // <Container
                //   color="danger"
                //   className="bg-secondary p-0"
                //   key={`${e.name}${vendorName}-VendorColumn-Container-name`}>
                //   <RemoveButton vendorName={vendorName} itemObj={e} />
                //   <ItemNameComponent
                //     id={nodeRef}
                //     vendorName={vendorName}
                //     itemObj={e}
                //   />
                //   <ItemNumberComponent
                //     id={"Tooltip-" + e.itemNumber}
                //     vendorName={vendorName}
                //     itemObj={e}
                //   />
                //   <ColumnBarcodeImageComponent
                //     src={e.src}
                //     itemNumber={e.itemNumber}
                //     itemObj={e}
                //     vendorName={vendorName}
                //     officialVendorName={officialVendorName}
                //   />
                // </Container>
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
  vendorName: PropTypes.string,
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     addedItems: state.added[ownProps.vendorName],
//   };
// };

export default memo(VendorColumn);
