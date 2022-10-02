import {
  Button,
  Collapse,
  Card,
  ListGroup,
  Alert,
  ButtonGroup,
} from "react-bootstrap";
import { shallowEqual } from "react-redux";
import {
  useState,
  memo,
  useCallback,
  useContext,
  FC,
  KeyboardEvent,
} from "react";
import {
  selectByVendor,
  selectVendorOfficialName,
  selectVendorsLinks,
} from "../../../Redux/addedSlice";
import RowCounterBadge from "./IndividualRowComponents/RowCounterBadge";
import QRCodeImage from "./QRCodeImage";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import { DarkMode, myContextInterface } from "../../../App";
import ColumnToggleNamesButton from "./ColumnToggleNamesButton";
import ColumnToggleItemNumbersButton from "./ColumnToggleItemNumbersButton";
import ColumnToggleItemBarcodesButton from "./ColumnToggleItemBarcodesButton";
import { vendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";

type Props = {
  vendorName: vendorNameType;
};

const VendorColumn: FC<Props> = ({ vendorName }): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const [open, setOpen] = useState<boolean>(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  const addedItems = useAppSelector(selectByVendor(vendorName), shallowEqual);

  const buttonClick = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
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
        <RowCounterBadge
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
                <QRCodeImage
                  vendorName={vendorName}
                  key={`${vendorName}-VendorColumn-QRCodeImageComponent`}
                />
                <Alert key={`Alert-VendorColumn-${vendorName}`} variant="info">
                  <Alert.Link
                    key={`Alert.Link-VendorColumn-${vendorName}`}
                    href={vendorLink}>
                    {officialVendorName} Website
                  </Alert.Link>
                </Alert>
                <ButtonGroup className="mb-3">
                  <ColumnToggleNamesButton />
                  <ColumnToggleItemNumbersButton />
                  <ColumnToggleItemBarcodesButton />
                </ButtonGroup>
                <ListGroup key={`ListGroup-VendorColumn-${vendorName}`}>
                  {addedItems.map(e => (
                    <RowSingleContainer
                      itemObj={e}
                      {...e}
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
};

export default memo<Props>(VendorColumn);
