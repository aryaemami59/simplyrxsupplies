import type { OutputSelector, Selector, UnknownMemoizer } from "reselect"
import type { ItemNameAndKeywords } from "../types/api.js"
import type { RootSelectorParamsProvider } from "../types/reduxHelperTypes.js"
import { fallbackToEmptyArray } from "../utils/fallbackToEmptyArray.js"
import { setSelectorNames } from "../utils/setSelectorNames.js"
import { ADAPTER_SELECTORS, getAllEntitySelectors } from "./adapterSelectors.js"
import { apiSelectors } from "./apiSlice.js"
import {
  createParametricSelectorHooks,
  createSelectorWeakMap,
} from "./createSelectors.js"
import type { RootState } from "./store.js"
import { TOP_LEVEL_SELECTORS } from "./topLevelSelectors.js"

const ROOT_SELECTOR_PARAMS_PROVIDER = {
  getCartIdAndItemId: (_state, _cartId, itemId) => itemId,
  getItemId: (_state, itemId) => itemId,
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
    items.map<ItemNameAndKeywords>(({ id, keywords, name }) => ({
      id,
      keywords,
      name,
    })),
)

export const selectCartsItemIdsLength = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectAll],
  carts => carts.map(({ itemIds }) => itemIds.length),
)

export const checkIfAnyItemsAdded = createSelectorWeakMap(
  [selectCartsItemIdsLength],
  itemIdsLengthArray =>
    itemIdsLengthArray.reduce(
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
    carts.reduce(
      (accumulator, cart) => cart.itemIds.includes(itemId) && accumulator,
      true,
    ),
)

export const parametricSelectors = {
  checkIfAddedToAllVendors,
  checkIfAddedToVendor,
  checkIfAnyAddedToOneVendor,
  isMinimized,
  isVendorChecked,
  selectCartItemNamesStringified,
  selectCartItemsIds,
  selectCartItemsLength,
  selectCartsByItemId,
  selectCategoryItemIds,
  selectCategoryName,
  selectCheckedVendorIds,
  selectItemName,
  selectItemNumber,
  selectItemSrc,
  selectOfficialVendorName,
  selectQRCodeText,
  selectVendorIdsByItemId,
  selectVendorItemIds,
  selectVendorsLinks,
} as const satisfies Record<
  `${"check" | "is" | "select"}${string}`,
  OutputSelector<
    Selector<RootState, unknown, readonly [number, number, ...unknown[]]>[],
    unknown,
    UnknownMemoizer,
    UnknownMemoizer
  >
>

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
  checkIfAddedToAllVendors,
  checkIfAddedToVendor,
  checkIfAnyAddedToOneVendor,
  checkIfAnyItemsAdded,
  isMinimized,
  isVendorChecked,
  selectCartItemNamesStringified,
  selectCartItemsIds,
  selectCartItemsLength,
  selectCartsByItemId,
  selectCartsItemIdsLength,
  selectCategoryItemIds,
  selectCategoryName,
  selectItemName,
  selectItemNamesAndKeywords,
  selectItemNumber,
  selectItemSrc,
  selectOfficialVendorName,
  selectQRCodeText,
  selectVendorIdsByItemId,
  selectVendorItemIds,
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
    selector.resetDependencyRecomputations()
    selector.resetResultsCount()
    selector.memoizedResultFunc.clearCache()
    selector.memoizedResultFunc.resetResultsCount()
  })
}
