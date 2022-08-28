import {
  Button,
  Collapse,
  Card,
  ListGroup,
  Alert,
  ButtonGroup,
} from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { useState, memo, useCallback, useContext } from "react";
import {
  selectByVendor,
  selectVendorOfficialName,
  selectVendorsLinks,
  ToggleItemBarcode,
  ToggleItemName,
  ToggleItemNumber,
} from "../../../addedSlice";
import BadgeComponent from "./BadgeComponent";
import QRCodeImageComponent from "./QRCodeImageComponent";
import SingleVendorColumnListItem from "./SingleVendorColumnListItem";
import PropTypes from "prop-types";
import { DarkMode } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch, RootState } from "../../../data/store";

function VendorColumn({ vendorName }) {
  const { darkTheme } = useContext(DarkMode);
  const [open, setOpen] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  const addedItems = useAppSelector(selectByVendor(vendorName), shallowEqual);
  const dispatch = useAppDispatch();
  const itemNumberShown = useAppSelector(
    (state: RootState) => state.added.showItemNumber
  );
  const itemBarcodeShown = useAppSelector(
    (state: RootState) => state.added.showItemBarcode
  );
  const itemNameShown = useAppSelector(
    (state: RootState) => state.added.showItemName
  );

  const buttonClick = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const toggleItemNumber = useCallback(() => {
    dispatch(ToggleItemNumber());
  }, [dispatch]);

  const toggleItemBarcode = useCallback(() => {
    dispatch(ToggleItemBarcode());
  }, [dispatch]);

  const toggleItemName = useCallback(() => {
    dispatch(ToggleItemName());
  }, [dispatch]);

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
                    // target={"blank"}
                    href={vendorLink}>
                    {officialVendorName} Website
                  </Alert.Link>
                </Alert>
                {/* <ButtonGroup>
                  <Button size="sm" className="mb-3" variant="warning">
                    Minimize All Items
                  </Button>
                  <Button size="sm" className="mb-3" variant="warning">
                    Expand All Items
                  </Button>
                  <Button size="sm" className="mb-3" variant="warning">
                    Remove All Items
                  </Button>
                  <Button size="sm" className="mb-3" variant="warning">
                    Remove All Duplicate Items
                  </Button>
                </ButtonGroup> */}
                <ButtonGroup className="mb-3">
                  <Button onClick={toggleItemName}>
                    {itemNameShown ? "Hide" : "Show"} Item Name
                    <FontAwesomeIcon
                      size="lg"
                      className="ms-3"
                      icon={itemNameShown ? faToggleOn : faToggleOff}
                    />
                  </Button>
                  <Button onClick={toggleItemNumber}>
                    {itemNumberShown ? "Hide" : "Show"} Item Number
                    <FontAwesomeIcon
                      size="lg"
                      className="ms-3"
                      icon={itemNumberShown ? faToggleOn : faToggleOff}
                    />
                  </Button>
                  <Button onClick={toggleItemBarcode}>
                    {itemBarcodeShown ? "Hide" : "Show"} Item Barcode
                    <FontAwesomeIcon
                      size="lg"
                      className="ms-3"
                      icon={itemBarcodeShown ? faToggleOn : faToggleOff}
                    />
                  </Button>
                </ButtonGroup>
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
