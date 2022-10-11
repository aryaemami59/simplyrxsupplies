import { List, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { VendorAndItemName } from "../../../../../customTypes/types";
import { useAppSelector } from "../../../../../Redux/hooks";
import { selectVendorOfficialName } from "../../../../../Redux/selectors";
import VendorLink from "../../VendorLink";
import RowBarcodeImage from "../RowBarcodeImage";
import RowItemName from "../RowItemName";
import RowItemNumber from "../RowItemNumber";

type Props = VendorAndItemName;

const ModalBodyContent: FC<Props> = ({ itemName, vendorName }) => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <div className="justify-content-center text-center fs-4 row">
      <div
        key={`Col-thirdCol-App`}
        className="justify-content-center col-10">
        <div
          className="container"
          key={`${itemName}${vendorName}-VendorColumn-Container-name`}>
          <List>
            <RowItemName
              itemName={itemName}
              vendorName={vendorName}
            />
            <RowItemNumber itemName={itemName} />
            <RowBarcodeImage
              itemName={itemName}
              vendorName={vendorName}
            />
            <ListItemText>
              <VendorLink
                officialVendorName={officialVendorName}
                vendorName={vendorName}
              />
            </ListItemText>
          </List>
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(ModalBodyContent);
