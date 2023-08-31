import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import type { FC } from "react";
import { memo } from "react";

import ItemIdProvider from "../../contexts/ItemIdProvider";
import useVendorId from "../../hooks/useVendorId";
import { useAppSelector } from "../../redux/hooks";
import { selectCartItemsIds } from "../../redux/selectors";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImageContainer from "./QRCodeComponents/QRCodeImageContainer";
import VendorLink from "./VendorLink";

const ColumnTopCardBody: FC = () => {
  const vendorId = useVendorId();
  const addedItemsIds = useAppSelector(state =>
    selectCartItemsIds(state, vendorId)
  );
  console.log(addedItemsIds);
  // const addedItems = useAppSelector(
  //   selectAddedItemsByVendor(vendorId),
  //   shallowEqual
  // );
  return (
    <CardContent className="p-2">
      <QRCodeImageContainer />
      <VendorLink />
      <List>
        {addedItemsIds.map(addedItemsId => (
          <ItemIdProvider
            key={`${addedItemsId}-${vendorId}`}
            itemId={addedItemsId}>
            <RowSingleContainer
              key={`${addedItemsId}-${vendorId}-SingleVendorColumnListItem`}
            />
          </ItemIdProvider>
        ))}
      </List>
    </CardContent>
  );
};

export default memo(ColumnTopCardBody);
