import Container from "react-bootstrap/Container";
import RemoveButton from "./RemoveButton";
import ItemNameComponent from "./ItemNameComponent";
import ItemNumberComponent from "./ItemNumberComponent";
import ColumnBarcodeImageComponent from "./ColumnBarcodeImageComponent";
import { memo } from "react";
import PropTypes from "prop-types";

function SingleVendorColumnListItem({
  itemObj,
  vendorName,
  officialVendorName,
}) {
  return (
    <Container
      className="bg-secondary p-0"
      key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
      <RemoveButton
        vendorName={vendorName}
        itemObj={itemObj}
        key={`${itemObj}-${vendorName}-RemoveButton`}
      />
      <ItemNameComponent
        vendorName={vendorName}
        itemObj={itemObj}
        key={`${itemObj.name}-${vendorName}-ItemNameComponent`}
      />
      <ItemNumberComponent
        vendorName={vendorName}
        itemObj={itemObj}
        key={`${itemObj.name}-${vendorName}-ItemNumberComponent`}
      />
      <ColumnBarcodeImageComponent
        src={itemObj.src}
        itemNumber={itemObj.itemNumber}
        itemObj={itemObj}
        vendorName={vendorName}
        officialVendorName={officialVendorName}
        key={`${itemObj.name}-${vendorName}-ColumnBarcodeImageComponent`}
      />
    </Container>
  );
}

PropTypes.propTypes = {
  vendorName: PropTypes.string,
  officialVendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SingleVendorColumnListItem);
