import CardContent from "@mui/material/CardContent"
import List from "@mui/material/List"
import { ItemIdProvider } from "../../contexts/ItemIdProvider.js"
import { useVendorId } from "../../hooks/useVendorId.js"
import { useCartItemsIds } from "../../redux/selectors.js"
import { RowSingleContainer } from "./IndividualRowComponents/RowSingleContainer.js"
import { QRCodeImageContainer } from "./QRCodeComponents/QRCodeImageContainer.js"
import { VendorLink } from "./VendorLink.js"

export const ColumnTopCardBody = () => {
  const vendorId = useVendorId()

  const addedItemsIds = useCartItemsIds(vendorId)

  return (
    <CardContent className="p-2">
      <QRCodeImageContainer />
      <VendorLink />
      <List>
        {addedItemsIds.map(addedItemsId => (
          <ItemIdProvider
            itemId={addedItemsId}
            key={`${addedItemsId.toString()}-${vendorId.toString()}-ItemIdProvider`}
          >
            <RowSingleContainer />
          </ItemIdProvider>
        ))}
      </List>
    </CardContent>
  )
}
