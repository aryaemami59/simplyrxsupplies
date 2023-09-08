import type { ItemNameAndKeywords } from "../types/api";
import type { RootSelectorParamsProvider } from "../types/reduxHelperTypes";
import withEmptyArrayFallback from "../utils/withEmptyArrayFallback";
import { ADAPTER_SELECTORS } from "./adapterSelectors";
import { createAppSelector } from "./createSelectors";

const ROOT_SELECTOR_PARAMS_PROVIDER: RootSelectorParamsProvider = {
  getItemId: (state, itemId) => itemId,
  getCartIdAndItemId: (state, cartId, itemId) => itemId,
  getItemIdAndCartId: (state, itemId, cartId) => cartId,
} as const satisfies RootSelectorParamsProvider;

export const selectVendorsLinks = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.link ?? ""
);

export const selectItemNumber = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.itemNumber ?? ""
);

export const selectItemSrc = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.src ?? ""
);

export const selectItemName = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.name ?? ""
);

export const selectVendorIdsByItemId = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => withEmptyArrayFallback(item?.vendorIds)
);

export const selectItemNamesAndKeywords = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.items.selectAll],
  items =>
    items.map<ItemNameAndKeywords>(({ name, keywords, id }) => ({
      name,
      keywords,
      id,
    }))
);

export const checkIfAnyItemsAdded = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectAll],
  carts =>
    carts.reduce<boolean>(
      (accumulator, cart) => cart.itemIds.length > 0 || accumulator,
      false
    )
);

export const selectCartItemsIds = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectById],
  cart => withEmptyArrayFallback(cart?.itemIds)
);

export const selectCartItemNamesStringified = createAppSelector(
  [selectCartItemsIds, ADAPTER_SELECTORS.GLOBAL.items.selectEntities],
  (cartItemIds, itemsEntities) =>
    cartItemIds
      .map<string>(cartItemId => itemsEntities[cartItemId]?.name ?? "")
      .join(", ")
);

export const selectCheckedVendorIds = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.itemVendors.selectById],
  checkedVendorItem =>
    withEmptyArrayFallback(checkedVendorItem?.checkedVendorIds)
);

export const isVendorChecked = createAppSelector(
  [
    ADAPTER_SELECTORS.GLOBAL.itemVendors.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getItemIdAndCartId,
  ],
  (checkedVendorItem, vendorId) =>
    !!checkedVendorItem?.checkedVendorIds.includes(vendorId)
);

export const isMinimized = createAppSelector(
  [
    ADAPTER_SELECTORS.GLOBAL.cartItems.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId,
  ],
  (cartItems, itemId) => !!cartItems?.minimizedItemIds.includes(itemId)
);

export const selectCategoryName = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => category?.name ?? "Vials"
);

export const selectCategoryItemIds = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => withEmptyArrayFallback(category?.itemIds)
);

export const checkIfAddedToVendor = createAppSelector(
  [selectCartItemsIds, ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId],
  (cartItemsIds, itemId) => cartItemsIds.includes(itemId)
);

export const selectCartItemsLength = createAppSelector(
  [selectCartItemsIds],
  cartItemIds => cartItemIds.length
);

export const checkIfAnyAddedToOneVendor = createAppSelector(
  [selectCartItemsLength],
  cartItemIdsLength => cartItemIdsLength > 0
);

export const selectQRCodeText = createAppSelector(
  [
    selectCartItemsIds,
    ADAPTER_SELECTORS.GLOBAL.items.selectEntities,
    ADAPTER_SELECTORS.GLOBAL.vendors.selectById,
  ],
  (cartItemIds, itemEntities, vendor) =>
    cartItemIds
      .map(cartItemId => itemEntities[cartItemId]?.itemNumber)
      .join(vendor?.joinChars)
);

export const selectOfficialName = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.officialName ?? "GNFR"
);

export const selectVendorItemIds = createAppSelector(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => withEmptyArrayFallback(vendor?.itemIds)
);

export const selectCartsByItemId = createAppSelector(
  [
    ADAPTER_SELECTORS.GLOBAL.items.selectById,
    ADAPTER_SELECTORS.GLOBAL.cart.selectAll,
  ],
  (item, carts) =>
    withEmptyArrayFallback(
      carts.filter(cart => item?.vendorIds.includes(cart.id))
    )
);

export const checkIfAddedToAllVendors = createAppSelector(
  [selectCartsByItemId, ROOT_SELECTOR_PARAMS_PROVIDER.getItemId],
  (carts, itemId) =>
    carts.reduce<boolean>(
      (accumulator, cart) => cart.itemIds.includes(itemId) && accumulator,
      true
    )
);
