import { FC, memo } from "react";
import { ButtonGroup, CardContent, List } from "@mui/material";
import {
  ItemObjType,
  officialVendorNameType,
  vendorNameType,
} from "../../../customTypes/types";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImageContainer from "./QRCodeComponents/QRCodeImageContainer";
import ColumnToggleItemBarcodesButton from "./ToggleComponents/ColumnToggleItemBarcodesButton";
import ColumnToggleItemNumbersButton from "./ToggleComponents/ColumnToggleItemNumbersButton";
import ColumnToggleNamesButton from "./ToggleComponents/ColumnToggleNamesButton";
import VendorLink from "./VendorLink";

type Props = {
  addedItems: ItemObjType[];
  vendorName: vendorNameType;
  officialVendorName: officialVendorNameType;
};

const ColumnTopCardBody: FC<Props> = ({
  addedItems,
  officialVendorName,
  vendorName,
}) => {
  return (
    <>
      <CardContent>
        <QRCodeImageContainer vendorName={vendorName} />
        <VendorLink
          officialVendorName={officialVendorName}
          vendorName={vendorName}
        />
        <ButtonGroup className="flex-wrap justify-content-center w-100">
          <ColumnToggleNamesButton />
          <ColumnToggleItemNumbersButton />
          <ColumnToggleItemBarcodesButton />
        </ButtonGroup>
        <List>
          {addedItems.map(itemObj => (
            <RowSingleContainer
              key={`${itemObj.id}-${vendorName}-SingleVendorColumnListItem`}
              {...{ itemObj, vendorName }}
            />
          ))}
        </List>
      </CardContent>
    </>
  );
};

export default memo<Props>(ColumnTopCardBody);
