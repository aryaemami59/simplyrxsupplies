import { List, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import {
  ItemName,
  ItemObjType,
  VendorAndItemName,
  VendorNameType,
} from "../../../../../customTypes/types";
import { selectVendorOfficialName } from "../../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../../Redux/hooks";
import VendorLink from "../../VendorLink";
import RowBarcodeImage from "../RowBarcodeImage";
import RowItemName from "../RowItemName";
import RowItemNumber from "../RowItemNumber";

// type Props = {
//   itemName: ItemName;

//   // itemObj: ItemObjType;
//   vendorName: VendorNameType;
// };

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
            <RowItemNumber
              itemName={itemName}
              vendorName={vendorName}
            />
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
