import type { AddedSliceSelectorParamsProvider } from "../types/reduxHelperTypes.js"
import { fallbackToEmptyArray } from "../utils/fallbackToEmptyArray.js"
import { ADAPTER_SELECTORS } from "./adapterSelectors.js"
import { createDraftSafeAddedSelector } from "./createSelectors.js"

/**
 * Input selectors that forward the extra positional arguments passed to a
 * selector (a cart ID or an item ID) through as their result. Used to feed
 * per-call parameters into the memoized selectors in
 * {@linkcode DRAFT_SAFE_SELECTORS}.
 */
export const ADDED_SLICE_SELECTOR_PARAMS_PROVIDER = {
  getCartId: (_added, cartId) => cartId,
  getItemId: (_added, itemId) => itemId,
} as const satisfies AddedSliceSelectorParamsProvider

/**
 * Draft-safe memoized selectors (created via
 * {@linkcode createDraftSafeAddedSelector()}) that derive cart and
 * item-vendor data from the added slice. Being draft-safe, they can be called
 * with an Immer draft - e.g. inside the slice reducers - as well as with
 * normal state.
 */
export const DRAFT_SAFE_SELECTORS = {
  selectCartItems: createDraftSafeAddedSelector(
    [ADAPTER_SELECTORS.LOCAL.cart.selectById],
    cart => fallbackToEmptyArray(cart?.itemIds),
  ),

  selectCartsByCheckedVendors: createDraftSafeAddedSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectById,
      ADAPTER_SELECTORS.LOCAL.cart.selectAll,
      ADDED_SLICE_SELECTOR_PARAMS_PROVIDER.getItemId,
    ],
    (itemVendors, carts, itemId) =>
      fallbackToEmptyArray(
        carts.filter(
          ({ id, itemIds }) =>
            !!itemVendors?.checkedVendorIds.includes(id) &&
            !itemIds.includes(itemId),
        ),
      ),
  ),

  selectCheckedVendorIds: createDraftSafeAddedSelector(
    [ADAPTER_SELECTORS.LOCAL.itemVendors.selectById],
    itemVendors => fallbackToEmptyArray(itemVendors?.checkedVendorIds),
  ),

  selectItemVendorsByVendorId: createDraftSafeAddedSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectAll,
      ADDED_SLICE_SELECTOR_PARAMS_PROVIDER.getCartId,
    ],
    (itemVendors, cartId) =>
      fallbackToEmptyArray(
        itemVendors.filter(({ checkedVendorIds }) =>
          checkedVendorIds.includes(cartId),
        ),
      ),
  ),

  selectUnCheckedItemVendors: createDraftSafeAddedSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectAll,
      ADDED_SLICE_SELECTOR_PARAMS_PROVIDER.getCartId,
    ],
    (itemVendors, cartId) =>
      fallbackToEmptyArray(
        itemVendors.filter(
          ({ checkedVendorIds, vendorIds }) =>
            vendorIds.includes(cartId) && !checkedVendorIds.includes(cartId),
        ),
      ),
  ),
}
