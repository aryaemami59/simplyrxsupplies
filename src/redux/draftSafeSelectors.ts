import type { AddedSliceSelectorParamsProvider } from "../types/AddedState";
import setToEmptyArray from "../utils/setToEmptyArray";
import { ADAPTER_SELECTORS } from "./adapterSelectors";
import { createDraftSafeAppSelector } from "./hooks";

export const ADDED_SLICE_SELECTOR_PARAMS_PROVIDER: AddedSliceSelectorParamsProvider =
  {
    getItemId: (added, itemId) => itemId,
    getCartId: (added, cartId) => cartId,
    getCartIdAndItemId: (added, cartId, itemId) => itemId,
    getItemIdAndCartId: (added, itemId, cartId) => cartId,
  } as const satisfies AddedSliceSelectorParamsProvider;

class DraftSafeSelectors {
  public readonly selectCartItems = createDraftSafeAppSelector(
    [ADAPTER_SELECTORS.LOCAL.cart.selectById],
    cart => setToEmptyArray(cart?.itemIds)
  );

  public readonly selectUnCheckedVendorIds = createDraftSafeAppSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectAll,
      ADDED_SLICE_SELECTOR_PARAMS_PROVIDER.getCartId,
    ],
    (itemVendors, cartId) =>
      setToEmptyArray(
        itemVendors.filter(
          ({ checkedVendorIds, vendorIds }) =>
            vendorIds.includes(cartId) && !checkedVendorIds.includes(cartId)
        )
      )
  );

  public readonly selectSearchResultsByVendorId = createDraftSafeAppSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectAll,
      ADDED_SLICE_SELECTOR_PARAMS_PROVIDER.getCartId,
    ],
    (itemVendors, cartId) =>
      setToEmptyArray(
        itemVendors.filter(({ checkedVendorIds }) =>
          checkedVendorIds.includes(cartId)
        )
      )
  );

  public readonly selectCartsByCheckedVendors = createDraftSafeAppSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectById,
      ADAPTER_SELECTORS.LOCAL.cart.selectAll,
      ADDED_SLICE_SELECTOR_PARAMS_PROVIDER.getItemId,
    ],
    (itemVendors, carts, itemId) =>
      setToEmptyArray(
        carts.filter(
          ({ id, itemIds }) =>
            !!(itemVendors?.checkedVendorIds.includes(id) ?? false) &&
            !itemIds.includes(itemId)
        )
      )
  );
}

export const DRAFT_SAFE_SELECTORS = new DraftSafeSelectors();
