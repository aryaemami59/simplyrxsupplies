import {
  Button,
  Collapse,
  Card,
  ListGroup,
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
} from "../../../Redux/addedSlice";
import RowCounterBadge from "./IndividualRowComponents/RowCounterBadge";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import { DarkMode, myContextInterface } from "../../../App";
import ColumnToggleItemBarcodesButton from "./ToggleComponents/ColumnToggleItemBarcodesButton";
import { vendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import QRCodeImage from "./QRCodeComponents/QRCodeImage";
import ColumnToggleNamesButton from "./ToggleComponents/ColumnToggleNamesButton";
import ColumnToggleItemNumbersButton from "./ToggleComponents/ColumnToggleItemNumbersButton";
import VendorLink from "./VendorLink";
import EmptyColumn from "./EmptyColumn";
import ColumnTopCardBody from "./ColumnTopCardBody";

type Props = {
  vendorName: vendorNameType;
};

const VendorColumn: FC<Props> = ({ vendorName }): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const [open, setOpen] = useState<boolean>(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
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
        onClick={buttonClick}>
        {officialVendorName}
        <RowCounterBadge vendorName={vendorName} />
      </Button>
      <Collapse
        key={`Collapse-VendorColumn-${vendorName}`}
        in={open}>
        <div key={`div-VendorColumn-${vendorName}`}>
          <Card
            key={`Card-VendorColumn-${vendorName}`}
            tabIndex={0}
            className={darkTheme ? "custom-bg-color-2" : "custom-light-mode"}
            onKeyDown={handleKeyDown}>
            {addedItems.length ? (
              <ColumnTopCardBody
                {...{ addedItems, vendorName, officialVendorName }}
                // addedItems={addedItems}
                // vendorName={vendorName}
                // officialVendorName={officialVendorName}
              />
            ) : (
              // <Card.Body key={`Card.Body-VendorColumn-${vendorName}`}>
              //   <QRCodeImage
              //     vendorName={vendorName}
              //     key={`${vendorName}-VendorColumn-QRCodeImageComponent`}
              //   />
              //   <VendorLink
              //     officialVendorName={officialVendorName}
              //     vendorName={vendorName}
              //   />
              //   <ButtonGroup className="mb-3">
              //     <ColumnToggleNamesButton />
              //     <ColumnToggleItemNumbersButton />
              //     <ColumnToggleItemBarcodesButton />
              //   </ButtonGroup>
              //   <ListGroup key={`ListGroup-VendorColumn-${vendorName}`}>
              //     {addedItems.map(itemObj => (
              //       <RowSingleContainer
              //         itemObj={itemObj}
              //         vendorName={vendorName}
              //         key={`${itemObj.name}-${vendorName}-SingleVendorColumnListItem`}
              //       />
              //     ))}
              //   </ListGroup>
              // </Card.Body>
              <EmptyColumn />
            )}
          </Card>
        </div>
      </Collapse>
    </>
  );
};

export default memo<Props>(VendorColumn);
