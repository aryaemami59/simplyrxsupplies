import { Card, Collapse } from "@mui/material";
import Button from "@mui/material/Button";
import {
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";
// import { Card, Collapse } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { DarkMode } from "../../../App";
import { vendorNameType } from "../../../customTypes/types";
import {
  selectByVendor,
  selectVendorOfficialName,
} from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import ColumnTopCardBody from "./ColumnTopCardBody";
import EmptyColumn from "./EmptyColumn";
import RowCounterBadge from "./IndividualRowComponents/RowCounterBadge";

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
        variant="contained"
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
            // tabIndex={0}
            // className={theme}
            onKeyDown={handleKeyDown}>
            {addedItems.length ? (
              <ColumnTopCardBody
                addedItems={addedItems}
                vendorName={vendorName}
                officialVendorName={officialVendorName}
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
