import { List, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import { selectVendorOfficialName } from "../../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../../Redux/hooks";
import VendorLink from "../../VendorLink";
import RowBarcodeImage from "../RowBarcodeImage";
import RowItemName from "../RowItemName";
import RowItemNumber from "../RowItemNumber";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const ModalBodyContent: FC<Props> = ({ itemObj, vendorName }) => {
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
          key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
          <List>
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
