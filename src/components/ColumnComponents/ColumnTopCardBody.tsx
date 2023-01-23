import { CardContent, List } from "@mui/material";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../Redux/hooks";
import { selectAddedItemsByVendor } from "../../Redux/selectors";
import ItemNameProvider from "../../contexts/ItemNameProvider";
import useVendorName from "../../hooks/useVendorName";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImageContainer from "./QRCodeComponents/QRCodeImageContainer";
import VendorLink from "./VendorLink";

const ColumnTopCardBody: FC = () => {
  const [allCollapsed, setAllCollapsed] = useState(true);
  const vendorName = useVendorName();
  const addedItems = useAppSelector(
    selectAddedItemsByVendor(vendorName),
    shallowEqual
  );

  const toggleCollapse = useCallback(() => {
    setAllCollapsed(prev => !prev);
  }, []);

  return (
    <CardContent className="p-2">
      <QRCodeImageContainer
        toggleCollapse={toggleCollapse}
        allCollapsed={allCollapsed}
      />
      <VendorLink />
      <List>
        {addedItems.map(itemName => (
          <ItemNameProvider
            key={`${itemName}-${vendorName}`}
            itemName={itemName}>
            <RowSingleContainer
              toggleCollapse={toggleCollapse}
              allCollapsed={allCollapsed}
              key={`${itemName}-${vendorName}-SingleVendorColumnListItem`}
            />
          </ItemNameProvider>
        ))}
      </List>
    </CardContent>
  );
};

export default memo(ColumnTopCardBody);
