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

/**
 * Input selectors that forward a selector's extra positional arguments (item
 * and cart IDs) through as their result, so that parametric selectors built on
 * the {@linkcode RootState} can receive per-call parameters.
 */
const ROOT_SELECTOR_PARAMS_PROVIDER = {
  getCartIdAndItemId: (_state, _cartId, itemId) => itemId,
  getItemId: (_state, itemId) => itemId,
  getItemIdAndCartId: (_state, _itemId, cartId) => cartId,
} as const satisfies RootSelectorParamsProvider

/**
 * Selects the ordering-portal link for a vendor by ID, or `""` when the
 * vendor is unknown.
 */
export const selectVendorsLinks = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.link ?? "",
)

/**
 * Selects an item's vendor-assigned item number by ID, or `""` when the item
 * is unknown.
 */
export const selectItemNumber = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.itemNumber ?? "",
  {
    memoizeOptions: {
      resultEqualityCheck: (a, b) => a === b,
    },
  },
)

/**
 * Selects an item's image source URL by ID, or `""` when the item is unknown.
 */
export const selectItemSrc = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.src ?? "",
)

/**
 * Selects an item's display name by ID, or `""` when the item is unknown.
 */
export const selectItemName = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => item?.name ?? "",
)

/**
 * Selects the vendor IDs that supply a given item, or an empty array when the
 * item is unknown.
 */
export const selectVendorIdsByItemId = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectById],
  item => fallbackToEmptyArray(item?.vendorIds),
)

/**
 * Selects every item projected down to its
 * {@linkcode ItemNameAndKeywords | id, keywords, and name} for use by search.
 */
export const selectItemNamesAndKeywords = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.items.selectAll],
  items =>
    items.map<ItemNameAndKeywords>(({ id, keywords, name }) => ({
      id,
      keywords,
      name,
    })),
)

/**
 * Selects the number of items in each vendor's cart, as an array of counts.
 */
export const selectCartsItemIdsLength = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectAll],
  carts => carts.map(({ itemIds }) => itemIds.length),
)

/**
 * Returns `true` when any vendor's cart contains at least one item.
 */
export const checkIfAnyItemsAdded = createSelectorWeakMap(
  [selectCartsItemIdsLength],
  itemIdsLengthArray =>
    itemIdsLengthArray.reduce(
      (accumulator, itemIdsLength) => itemIdsLength > 0 || accumulator,
      false,
    ),
)

/**
 * Selects the item IDs in a given vendor's cart, or an empty array when the
 * cart is unknown.
 */
export const selectCartItemsIds = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.cart.selectById],
  cart => fallbackToEmptyArray(cart?.itemIds),
)

/**
 * Selects a comma-separated string of the item names in a given vendor's cart.
 */
export const selectCartItemNamesStringified = createSelectorWeakMap(
  [selectCartItemsIds, ADAPTER_SELECTORS.GLOBAL.items.selectEntities],
  (cartItemIds, itemsEntities) =>
    cartItemIds
      .map<string>(cartItemId => itemsEntities[cartItemId]?.name ?? "")
      .join(", "),
)

/**
 * Selects the checked vendor IDs for a given item, or an empty array when the
 * item has none.
 */
export const selectCheckedVendorIds = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.itemVendors.selectById],
  checkedVendorItem =>
    fallbackToEmptyArray(checkedVendorItem?.checkedVendorIds),
)

/**
 * Returns `true` when the given vendor is checked for the given item.
 */
export const isVendorChecked = createSelectorWeakMap(
  [
    ADAPTER_SELECTORS.GLOBAL.itemVendors.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getItemIdAndCartId,
  ],
  (checkedVendorItem, vendorId) =>
    !!checkedVendorItem?.checkedVendorIds.includes(vendorId),
)

/**
 * Returns `true` when the given item is minimized within the given vendor's
 * cart.
 */
export const isMinimized = createSelectorWeakMap(
  [
    ADAPTER_SELECTORS.GLOBAL.cartItems.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId,
  ],
  (cartItems, itemId) => !!cartItems?.minimizedItemIds.includes(itemId),
)

/**
 * Selects a category's name by ID, defaulting to `"Vials"` when the category
 * is unknown.
 */
export const selectCategoryName = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => category?.name ?? "Vials",
)

/**
 * Selects the item IDs belonging to a given category, or an empty array when
 * the category is unknown.
 */
export const selectCategoryItemIds = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.categories.selectById],
  category => fallbackToEmptyArray(category?.itemIds),
)

/**
 * Returns `true` when the given item is present in the given vendor's cart.
 */
export const checkIfAddedToVendor = createSelectorWeakMap(
  [selectCartItemsIds, ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId],
  (cartItemsIds, itemId) => cartItemsIds.includes(itemId),
)

/**
 * Selects the number of items in a given vendor's cart.
 */
export const selectCartItemsLength = createSelectorWeakMap(
  [selectCartItemsIds],
  cartItemIds => cartItemIds.length,
)

/**
 * Returns `true` when the given vendor's cart contains any items.
 */
export const checkIfAnyAddedToOneVendor = createSelectorWeakMap(
  [selectCartItemsLength],
  cartItemIdsLength => cartItemIdsLength > 0,
)

/**
 * Selects the joined item-number string used to build a vendor's order QR
 * code, concatenating each cart item's number with the vendor's join
 * characters.
 */
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

/**
 * Selects a vendor's official display name by ID, defaulting to `"GNFR"` when
 * the vendor is unknown.
 */
export const selectOfficialVendorName = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => vendor?.officialName ?? "GNFR",
)

/**
 * Selects the item IDs supplied by a given vendor, or an empty array when the
 * vendor is unknown.
 */
export const selectVendorItemIds = createSelectorWeakMap(
  [ADAPTER_SELECTORS.GLOBAL.vendors.selectById],
  vendor => fallbackToEmptyArray(vendor?.itemIds),
)

/**
 * Selects the carts belonging to the vendors that supply a given item, or an
 * empty array when the item is unknown.
 */
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

/**
 * Returns `true` when the given item is present in every one of its vendors'
 * carts.
 */
export const checkIfAddedToAllVendors = createSelectorWeakMap(
  [selectCartsByItemId, ROOT_SELECTOR_PARAMS_PROVIDER.getItemId],
  (carts, itemId) =>
    carts.reduce(
      (accumulator, cart) => cart.itemIds.includes(itemId) && accumulator,
      true,
    ),
)

/**
 * The set of parametric selectors - each accepting one or more ID arguments in
 * addition to the state - that are converted into `use*` React hooks by
 * {@linkcode createParametricSelectorHooks()}.
 */
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

/**
 * The `use*` React hooks generated from {@linkcode parametricSelectors} by
 * {@linkcode createParametricSelectorHooks()} - one hook per parametric
 * selector.
 */
const parametricSelectorHooks =
  createParametricSelectorHooks(parametricSelectors)

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
} = parametricSelectorHooks

/**
 * Aggregation of the primary derived selectors for the application, spanning
 * cart, item, vendor, and category data.
 */
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

/**
 * Every selector in the application - the {@linkcode mainSelectors},
 * {@linkcode apiSelectors}, per-entity selectors from
 * {@linkcode getAllEntitySelectors()}, and {@linkcode TOP_LEVEL_SELECTORS} -
 * merged into one object and named via {@linkcode setSelectorNames()} for
 * DevTools visibility.
 */
export const allSelectors = setSelectorNames({
  ...mainSelectors,
  ...apiSelectors,
  ...getAllEntitySelectors(),
  ...TOP_LEVEL_SELECTORS,
} as const)

/**
 * Clears the cache and resets the recomputation, dependency-recomputation, and
 * result counters of every selector in {@linkcode allSelectors}, and clears
 * the cache and result count of each selector's memoized result function.
 * Useful between tests or benchmarks.
 */
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
