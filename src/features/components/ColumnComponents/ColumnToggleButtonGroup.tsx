import { FC, memo } from "react";
import { Container } from "react-bootstrap";
import { itemInterface } from "../../../addedSlice";
import ItemNameComponent from "./ItemNameComponent";
import ItemNumberComponent from "./ItemNumberComponent";
import ColumnBarcodeImageComponent from "./ColumnBarcodeImageComponent";

interface Props {
  itemObj: itemInterface;
  vendorName: string;
}

const ColumnToggleButtonGroup: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  return (
    <Container key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
      <ItemNameComponent itemObj={itemObj} vendorName={vendorName} />
      <ItemNumberComponent itemObj={itemObj} vendorName={vendorName} />
      <ColumnBarcodeImageComponent itemObj={itemObj} vendorName={vendorName} />
    </Container>
  );
};

export default memo<Props>(ColumnToggleButtonGroup);
