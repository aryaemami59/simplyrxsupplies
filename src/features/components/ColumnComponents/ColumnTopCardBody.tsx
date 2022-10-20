import { CardContent, List } from "@mui/material";
import { FC, memo } from "react";
import { shallowEqual } from "react-redux";
import { VendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import { selectAddedItemsByVendor } from "../../../Redux/selectors";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImageContainer from "./QRCodeComponents/QRCodeImageContainer";
import VendorLink from "./VendorLink";

type Props = {
  vendorName: VendorNameType;
};

const ColumnTopCardBody: FC<Props> = ({ vendorName }) => {
  const addedItems = useAppSelector(
    selectAddedItemsByVendor(vendorName),
    shallowEqual
  );

  return (
    <CardContent>
      <QRCodeImageContainer vendorName={vendorName} />
      <VendorLink vendorName={vendorName} />
      <List>
        {addedItems.map(itemName => (
          <RowSingleContainer
            key={`${itemName}-${vendorName}-SingleVendorColumnListItem`}
            {...{ itemName, vendorName }}
          />
        ))}
      </List>
    </CardContent>
  );
};

export default memo<Props>(ColumnTopCardBody);
