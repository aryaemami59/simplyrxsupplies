import { FC, memo } from "react";
import { Container } from "react-bootstrap";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import RowBarcodeImage from "./RowBarcodeImage";
import RowItemName from "./RowItemName";
import RowItemNumber from "./RowItemNumber";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowSingleItemInfo: FC<Props> = ({ itemObj, vendorName }): JSX.Element => {
  return (
    <Container key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
      <RowItemName
        itemObj={itemObj}
        vendorName={vendorName}
      />
      <RowItemNumber
        itemObj={itemObj}
        vendorName={vendorName}
      />
      <RowBarcodeImage
        itemObj={itemObj}
        vendorName={vendorName}
      />
    </Container>
  );
};

export default memo<Props>(RowSingleItemInfo);
