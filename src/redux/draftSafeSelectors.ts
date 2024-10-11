import type { AddedSliceSelectorParamsProvider } from "../types/reduxHelperTypes"
import { fallbackToEmptyArray } from "../utils/fallbackToEmptyArray"
import { ADAPTER_SELECTORS } from "./adapterSelectors"
import { createDraftSafeAddedSelector } from "./createSelectors"

export const ADDED_SLICE_SELECTOR_PARAMS_PROVIDER: AddedSliceSelectorParamsProvider =
  {
    getItemId: (_added, itemId) => itemId,
    getCartId: (_added, cartId) => cartId,
  } as const satisfies AddedSliceSelectorParamsProvider

export const DRAFT_SAFE_SELECTORS = {
  selectCartItems: createDraftSafeAddedSelector(
    [ADAPTER_SELECTORS.LOCAL.cart.selectById],
    cart => fallbackToEmptyArray(cart?.itemIds),
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
}
