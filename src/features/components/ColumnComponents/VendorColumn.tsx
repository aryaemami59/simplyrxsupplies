import { Button, Collapse, Card } from "react-bootstrap";
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
import { DarkMode } from "../../../App";
import { vendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import EmptyColumn from "./EmptyColumn";
import ColumnTopCardBody from "./ColumnTopCardBody";

type Props = {
  vendorName: vendorNameType;
};

const VendorColumn: FC<Props> = ({ vendorName }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const [open, setOpen] = useState(false);
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

  const theme = darkTheme ? "custom-bg-color-2" : "custom-light-mode";

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
            className={theme}
            onKeyDown={handleKeyDown}>
            {addedItems.length ? (
              <ColumnTopCardBody
                {...{ addedItems, vendorName, officialVendorName }}
              />
            ) : (
              <EmptyColumn />
            )}
          </Card>
        </div>
      </Collapse>
    </>
  );
};

export default memo<Props>(VendorColumn);
