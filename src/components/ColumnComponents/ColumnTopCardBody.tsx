import { CardContent, List } from "@mui/material";
import { FC, memo } from "react";
import { shallowEqual } from "react-redux";
import ItemNameProvider from "../../contexts/ItemNameProvider";
import useVendorName from "../../hooks/useVendorName";
import { useAppSelector } from "../../Redux/hooks";
import { selectAddedItemsByVendor } from "../../Redux/selectors";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImageContainer from "./QRCodeComponents/QRCodeImageContainer";
import VendorLink from "./VendorLink";

const ColumnTopCardBody: FC = () => {
  const vendorName = useVendorName();
  const addedItems = useAppSelector(
    selectAddedItemsByVendor(vendorName),
    shallowEqual
  );

  return (
    <CardContent>
      <QRCodeImageContainer />
      <VendorLink />
      <List>
        {addedItems.map(itemName => (
          <ItemNameProvider
            key={`${itemName}-${vendorName}`}
            itemName={itemName}>
            <RowSingleContainer
              key={`${itemName}-${vendorName}-SingleVendorColumnListItem`}
            />
          </ItemNameProvider>
        ))}
      </List>
    </CardContent>
  );
};

export default memo(ColumnTopCardBody);
