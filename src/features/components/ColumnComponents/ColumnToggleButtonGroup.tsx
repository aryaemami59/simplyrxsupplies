import { FC, memo } from "react";
import { Container } from "react-bootstrap";
import ItemNameComponent from "./ItemNameComponent";
import ItemNumberComponent from "./ItemNumberComponent";
import ColumnBarcodeImageComponent from "./ColumnBarcodeImageComponent";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

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
