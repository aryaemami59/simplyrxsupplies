import { DraftSelectorsParametricSelectors } from "../types/AddedState";
import arrayDifference from "../utils/arrayDifference";
import ADAPTER_INITIAL_STATES from "./adapterInitialStates";
import { ADAPTER_SELECTORS } from "./adapterSelectors";
import { createDraftSafeAppSelector } from "./hooks";

export const parametricSelectors = {
  getItemId: (added, itemId) => itemId,
  getCartId: (added, cartId) => cartId,
  getCartIdAndItemId: (added, cartId, itemId) => itemId,
  getItemIdAndCartId: (added, itemId, cartId) => cartId,
} as const satisfies DraftSelectorsParametricSelectors;

class DraftSafeSelectors {
  public readonly selectCartItems = createDraftSafeAppSelector(
    [ADAPTER_SELECTORS.LOCAL.cart.selectById],
    cart => cart?.items ?? ADAPTER_INITIAL_STATES.cartItems
  );

  public readonly selectUnCheckedVendorIds = createDraftSafeAppSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectAll,
      parametricSelectors.getCartId,
    ],
    (itemVendors, cartId) =>
      itemVendors.filter(({ checkedVendors, vendors }) =>
        arrayDifference(vendors, checkedVendors).includes(cartId)
      )
  );

  public readonly selectSearchResultsByVendorId = createDraftSafeAppSelector(
    [
      ADAPTER_SELECTORS.LOCAL.itemVendors.selectAll,
      parametricSelectors.getCartId,
    ],
    (itemVendors, cartId) =>
      itemVendors.filter(({ checkedVendors }) =>
        checkedVendors.includes(cartId)
      )
  );
}

export const draftSafeSelectors = new DraftSafeSelectors();
