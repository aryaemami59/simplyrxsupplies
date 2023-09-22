import type { AddedSliceSelectorParamsProvider } from "../types/reduxHelperTypes";
import withEmptyArrayFallback from "../utils/withEmptyArrayFallback";
import { ADAPTER_SELECTORS } from "./adapterSelectors";
import { createDraftSafeAddedSelector } from "./createSelectors";

export const ADDED_SLICE_SELECTOR_PARAMS_PROVIDER: AddedSliceSelectorParamsProvider =
  {
    getItemId: (added, itemId) => itemId,
    getCartId: (added, cartId) => cartId,
  } as const satisfies AddedSliceSelectorParamsProvider;

export const DRAFT_SAFE_SELECTORS = {
  selectCartItems: createDraftSafeAddedSelector(
    [ADAPTER_SELECTORS.LOCAL.cart.selectById],
    cart => withEmptyArrayFallback(cart?.itemIds)
  ),

  selectUnCheckedItemVendors: createDraftSafeAddedSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectAll,
      ADDED_SLICE_SELECTOR_PARAMS_PROVIDER.getCartId,
    ],
    (itemVendors, cartId) =>
      withEmptyArrayFallback(
        itemVendors.filter(
          ({ checkedVendorIds, vendorIds }) =>
            vendorIds.includes(cartId) && !checkedVendorIds.includes(cartId)
        )
      )
  ),

  selectItemVendorsByVendorId: createDraftSafeAddedSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectAll,
      ADDED_SLICE_SELECTOR_PARAMS_PROVIDER.getCartId,
    ],
    (itemVendors, cartId) =>
      withEmptyArrayFallback(
        itemVendors.filter(({ checkedVendorIds }) =>
          checkedVendorIds.includes(cartId)
        )
      )
  ),

  selectCartsByCheckedVendors: createDraftSafeAddedSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectById,
      ADAPTER_SELECTORS.LOCAL.cart.selectAll,
      ADDED_SLICE_SELECTOR_PARAMS_PROVIDER.getItemId,
    ],
    (itemVendors, carts, itemId) =>
      withEmptyArrayFallback(
        carts.filter(
          ({ id, itemIds }) =>
            !!itemVendors?.checkedVendorIds.includes(id) &&
            !itemIds.includes(itemId)
        )
      )
  ),

  selectCheckedVendorIds: createDraftSafeAddedSelector(
    [ADAPTER_SELECTORS.LOCAL.itemVendors.selectById],
    itemVendors => withEmptyArrayFallback(itemVendors?.checkedVendorIds)
  ),
};
