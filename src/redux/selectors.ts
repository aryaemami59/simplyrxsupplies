import type { ItemNameAndKeywords } from "../types/api"
import type { RootSelectorParamsProvider } from "../types/reduxHelperTypes"
import { fallbackToEmptyArray } from "../utils/fallbackToEmptyArray"
import { setSelectorNames } from "../utils/setSelectorNames"
import { ADAPTER_SELECTORS, getAllEntitySelectors } from "./adapterSelectors"
import { apiSelectors } from "./apiSlice"
import {
  createParametricSelectorHooks,
  createSelectorWeakMap,
} from "./createSelectors"
import { TOP_LEVEL_SELECTORS } from "./topLevelSelectors"

const ROOT_SELECTOR_PARAMS_PROVIDER: RootSelectorParamsProvider = {
  getItemId: (_state, itemId) => itemId,
  getCartIdAndItemId: (_state, _cartId, itemId) => itemId,
  getItemIdAndCartId: (_state, _itemId, cartId) => cartId,
} as const satisfies RootSelectorParamsProvider

export const selectVendorsLinks = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.link ?? "",
)

export const selectItemNumber = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.itemNumber ?? "",
  {
    memoizeOptions: {
      resultEqualityCheck: (a, b) => a === b,
    },
  },
)

export const selectItemSrc = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.src ?? "",
)

export const selectItemName = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.name ?? "",
)

export const selectVendorIdsByItemId = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => fallbackToEmptyArray(item?.vendorIds),
)

export const selectItemNamesAndKeywords = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectAll],
  items =>
    items.map<ItemNameAndKeywords>(({ name, keywords, id }) => ({
      name,
      keywords,
      id,
    })),
)

export const selectCartsItemIdsLength = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectAll],
  carts => carts.map(({ itemIds }) => itemIds.length),
)

export const checkIfAnyItemsAdded = createSelectorWeakMap(
  [selectCartsItemIdsLength],
  itemIdsLengthArray =>
    itemIdsLengthArray.reduce<boolean>(
      (accumulator, itemIdsLength) => itemIdsLength > 0 || accumulator,
      false,
    ),
)

export const selectCartItemsIds = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectById],
  cart => fallbackToEmptyArray(cart?.itemIds),
)

export const selectCartItemNamesStringified = createSelectorWeakMap(
  [selectCartItemsIds, ADAPTER_SELECTORS.GLOBAL.items.selectEntities],
  (cartItemIds, itemsEntities) =>
    cartItemIds
      .map<string>(cartItemId => itemsEntities[cartItemId]?.name ?? "")
      .join(", "),
)

export const selectCheckedVendorIds = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.itemVendors.selectById],
  checkedVendorItem =>
    fallbackToEmptyArray(checkedVendorItem?.checkedVendorIds),
)

export const isVendorChecked = createSelectorWeakMap(
  [
    ADAPTER_SELECTORS.GLOBAL.itemVendors.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getItemIdAndCartId,
  ],
  (checkedVendorItem, vendorId) =>
    !!checkedVendorItem?.checkedVendorIds.includes(vendorId),
)

export const isMinimized = createSelectorWeakMap(
  [
    ADAPTER_SELECTORS.GLOBAL.cartItems.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId,
  ],
  (cartItems, itemId) => !!cartItems?.minimizedItemIds.includes(itemId),
)

export const selectCategoryName = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => category?.name ?? "Vials",
)

export const selectCategoryItemIds = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => fallbackToEmptyArray(category?.itemIds),
)

export const checkIfAddedToVendor = createSelectorWeakMap(
  [selectCartItemsIds, ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId],
  (cartItemsIds, itemId) => cartItemsIds.includes(itemId),
)

export const selectCartItemsLength = createSelectorWeakMap(
  [selectCartItemsIds],
  cartItemIds => cartItemIds.length,
)

export const checkIfAnyAddedToOneVendor = createSelectorWeakMap(
  [selectCartItemsLength],
  cartItemIdsLength => cartItemIdsLength > 0,
)

export const selectQRCodeText = createSelectorWeakMap(
  [
    selectCartItemsIds,
    ADAPTER_SELECTORS.GLOBAL.items.selectEntities,
    ADAPTER_SELECTORS.GLOBAL.vendors.selectById,
  ],
  (cartItemIds, itemEntities, vendor) =>
    cartItemIds
      .map(cartItemId => itemEntities[cartItemId]?.itemNumber)
      .join(vendor?.joinChars),
)

export const selectOfficialVendorName = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.officialName ?? "GNFR",
)

export const selectVendorItemIds = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => fallbackToEmptyArray(vendor?.itemIds),
)

export const selectCartsByItemId = createSelectorWeakMap(
  [
    ADAPTER_SELECTORS.GLOBAL.items.selectById,
    ADAPTER_SELECTORS.GLOBAL.cart.selectAll,
  ],
  (item, carts) =>
    fallbackToEmptyArray(
      carts.filter(cart => item?.vendorIds.includes(cart.id)),
    ),
)

export const checkIfAddedToAllVendors = createSelectorWeakMap(
  [selectCartsByItemId, ROOT_SELECTOR_PARAMS_PROVIDER.getItemId],
  (carts, itemId) =>
    carts.reduce<boolean>(
      (accumulator, cart) => cart.itemIds.includes(itemId) && accumulator,
      true,
    ),
)

export const parametricSelectors = {
  selectVendorsLinks,
  selectItemNumber,
  selectItemSrc,
  selectItemName,
  selectVendorIdsByItemId,
  selectCartItemsIds,
  selectCartItemNamesStringified,
  selectCheckedVendorIds,
  isVendorChecked,
  isMinimized,
  selectCategoryName,
  selectCategoryItemIds,
  checkIfAddedToVendor,
  selectCartItemsLength,
  checkIfAnyAddedToOneVendor,
  selectQRCodeText,
  selectOfficialVendorName,
  selectVendorItemIds,
  selectCartsByItemId,
  checkIfAddedToAllVendors,
}

export const {
  useCartItemNamesStringified,
  useCartItemsIds,
  useCartItemsLength,
  useCartsByItemId,
  useCategoryItemIds,
  useCategoryName,
  useCheckedVendorIds,
  useCheckIfAddedToAllVendors,
  useCheckIfAddedToVendor,
  useCheckIfAnyAddedToOneVendor,
  useIsMinimized,
  useIsVendorChecked,
  useItemName,
  useItemNumber,
  useItemSrc,
  useOfficialVendorName,
  useQRCodeText,
  useVendorIdsByItemId,
  useVendorItemIds,
  useVendorsLinks,
} = createParametricSelectorHooks(parametricSelectors)

export const mainSelectors = {
  selectItemNumber,
  selectItemSrc,
  selectItemName,
  selectVendorIdsByItemId,
  selectItemNamesAndKeywords,
  checkIfAnyItemsAdded,
  selectCartItemsIds,
  selectCartItemNamesStringified,
  isVendorChecked,
  isMinimized,
  selectCategoryName,
  selectCategoryItemIds,
  checkIfAddedToVendor,
  selectCartItemsLength,
  checkIfAnyAddedToOneVendor,
  selectQRCodeText,
  selectOfficialVendorName,
  selectVendorItemIds,
  selectCartsByItemId,
  checkIfAddedToAllVendors,
  selectCartsItemIdsLength,
} as const

export const allSelectors = setSelectorNames({
  ...mainSelectors,
  ...apiSelectors,
  ...getAllEntitySelectors(),
  ...TOP_LEVEL_SELECTORS,
} as const)

export const resetAllSelectors = () => {
  Object.values(allSelectors).forEach(selector => {
    selector.clearCache()
    selector.resetRecomputations()
    selector.memoizedResultFunc.clearCache()
  })
}
