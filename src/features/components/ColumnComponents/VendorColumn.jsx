import { Button, Collapse, Card, ListGroup, Alert } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";
import { useState, memo, useCallback, useContext } from "react";
import {
  selectByVendor,
  selectVendorOfficialName,
  selectVendorsLinks,
} from "../../../addedSlice";
import BadgeComponent from "./BadgeComponent";
import QRCodeImageComponent from "./QRCodeImageComponent";
import SingleVendorColumnListItem from "./SingleVendorColumnListItem";
import PropTypes from "prop-types";
import { DarkMode } from "../../../App";

function VendorColumn({ vendorName }) {
  const { darkTheme } = useContext(DarkMode);
  const [open, setOpen] = useState(false);
  const officialVendorName = useSelector(selectVendorOfficialName(vendorName));
  const vendorLink = useSelector(selectVendorsLinks(vendorName));
  const addedItems = useSelector(selectByVendor(vendorName), shallowEqual);

  const buttonClick = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

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
        className="position-relative d-block w-100 custom-text-shadow-white"
        variant="primary"
        onClick={buttonClick}
        key={`${officialVendorName}-VendorColumn-Button`}>
        {officialVendorName}
        <BadgeComponent
          vendorName={vendorName}
          key={`${officialVendorName}-VendorColumn-Badge`}
        />
      </Button>
      <Collapse key={`Collapse-VendorColumn-${vendorName}`} in={open}>
        <div key={`div-VendorColumn-${vendorName}`}>
          <Card
            key={`Card-VendorColumn-${vendorName}`}
            tabIndex={0}
            className={darkTheme ? "custom-bg-color-2" : "custom-light-mode"}
            onKeyDown={handleKeyDown}>
            {addedItems.length ? (
              <Card.Body key={`Card.Body-VendorColumn-${vendorName}`}>
                <QRCodeImageComponent
                  vendorName={vendorName}
                  key={`${vendorName}-VendorColumn-QRCodeImageComponent`}
                />
                <Alert key={`Alert-VendorColumn-${vendorName}`} variant="info">
                  <Alert.Link
                    key={`Alert.Link-VendorColumn-${vendorName}`}
                    target="blank"
                    href={vendorLink}>
                    {officialVendorName} Website
                  </Alert.Link>
                </Alert>
                <ListGroup key={`ListGroup-VendorColumn-${vendorName}`}>
                  {addedItems.map(e => (
                    <SingleVendorColumnListItem
                      itemObj={e}
                      vendorName={vendorName}
                      key={`${e.name}-${vendorName}-SingleVendorColumnListItem`}
                    />
                  ))}
                </ListGroup>
              </Card.Body>
            ) : (
              <ListGroup.Item
                key={`ListGroup.Item-VendorColumn-${vendorName}`}
                variant="danger">
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
  vendorName: PropTypes.string,
};

export default memo(VendorColumn);
