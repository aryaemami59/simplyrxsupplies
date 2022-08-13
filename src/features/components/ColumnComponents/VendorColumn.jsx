import { useState, memo, useCallback } from "react";
import BadgeComponent from "./BadgeComponent";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectByVendor } from "../../../addedSlice";
import QRCodeImageComponent from "./QRCodeImageComponent";
import SingleVendorColumnListItem from "./SingleVendorColumnListItem";
import { Button, Collapse, Card, ListGroup, Alert } from "react-bootstrap";
import vendorLinks from "../../../data/vendorLinks.json";

function VendorColumn({ officialVendorName, vendorName }) {
  const [open, setOpen] = useState(false);

  const addedItems = useSelector(selectByVendor(vendorName));

  const buttonClick = useCallback(() => {
    return setOpen(!open);
  }, [open]);

  const handleKeyDown = useCallback(
    e => {
      if (e.key === "m") {
        buttonClick();
      }
    },
    [buttonClick]
  );

  return (
    <>
      <Button
        className="position-relative d-block w-100"
        variant="primary"
        onClick={buttonClick}
        key={`${officialVendorName}-VendorColumn-Button`}>
        {officialVendorName}
        <BadgeComponent
          className="float-end"
          vendorName={vendorName}
          key={`${officialVendorName}-VendorColumn-Badge`}
        />
      </Button>
      <Collapse in={open}>
        <div>
          <Card
            tabIndex={0}
            className="custom-bg-color-2"
            onKeyDown={handleKeyDown}>
            {addedItems.length ? (
              <Card.Body className="">
                <QRCodeImageComponent vendorName={vendorName} />
                <Alert variant="info">
                  <Alert.Link
                    className=""
                    target="blank"
                    href={vendorLinks[vendorName]}>
                    {officialVendorName} Website
                  </Alert.Link>
                </Alert>
                <ListGroup>
                  {addedItems.map(e => (
                    <SingleVendorColumnListItem
                      itemObj={e}
                      vendorName={vendorName}
                      officialVendorName={officialVendorName}
                      key={`${e.name}-${vendorName}-SingleVendorColumnListItem`}
                    />
                  ))}
                </ListGroup>
              </Card.Body>
            ) : (
              <ListGroup.Item variant="danger">
                "No Item Has Been Added Yet!"
              </ListGroup.Item>
            )}
          </Card>
        </div>
      </Collapse>
    </>
  );
}

VendorColumn.propTypes = {
  officialVendorName: PropTypes.string,
  vendorName: PropTypes.string,
};

export default memo(VendorColumn);
