import type {
  AdapterLocalizedSelectors,
  AddedState,
  Selectors,
} from "../types/AddedState";
import { DraftSelectorsParametricSelectors } from "../types/AddedState";
import type { AdapterSimpleSelectors } from "../types/redux";
import difference from "../utils/difference";
import ADAPTERS from "./adapters/Adapters";
import { createDraftSafeAppSelector } from "./hooks";
import INITIAL_STATES from "./initialStates";

export const localizedSelectors: AdapterLocalizedSelectors = {
  searchResults: ADAPTERS.searchResults.getSelectors<AddedState>(
    added => added.searchResults
  ),

  cart: ADAPTERS.cart.getSelectors<AddedState>(added => added.cart),

  checkedVendorItems: ADAPTERS.checkedVendorItems.getSelectors<AddedState>(
    added => added.checkedVendorItems
  ),
} as const satisfies AdapterLocalizedSelectors;

export const simpleSelectors: AdapterSimpleSelectors = {
  searchResults: ADAPTERS.searchResults.getSelectors(),

  cart: ADAPTERS.cart.getSelectors(),

  items: ADAPTERS.items.getSelectors(),

  vendors: ADAPTERS.vendors.getSelectors(),

  categories: ADAPTERS.categories.getSelectors(),

  cartItems: ADAPTERS.cartItems.getSelectors(),

  checkedVendorItems: ADAPTERS.checkedVendorItems.getSelectors(),
} as const satisfies AdapterSimpleSelectors;

export const SELECTORS: Selectors = {
  SIMPLE: simpleSelectors,
  LOCAL: localizedSelectors,
} as const satisfies Selectors;

const parametricSelectors = {
  getItemId: (added, itemId) => itemId,
  getCartId: (added, cartId) => cartId,
  getCartIdAndItemId: (added, cartId, itemId) => itemId,
  getItemIdAndCartId: (added, itemId, cartId) => cartId,
} as const satisfies DraftSelectorsParametricSelectors;

class DraftSafeSelectors {
  public readonly selectCartItems = createDraftSafeAppSelector(
    [SELECTORS.LOCAL.cart.selectById],
    cart => (cart ? cart.items : INITIAL_STATES.cartItems)
  );

  public readonly selectUnCheckedVendorIds = createDraftSafeAppSelector(
    [
      SELECTORS.LOCAL.checkedVendorItems.selectAll,
      parametricSelectors.getCartId,
    ],
    (checkedVendorItems, cartId) =>
      checkedVendorItems.filter(({ checkedVendors, vendors }) =>
        difference(vendors, checkedVendors).includes(cartId)
      )
  );

  public readonly selectSearchResultsByVendorId = createDraftSafeAppSelector(
    [
      SELECTORS.LOCAL.checkedVendorItems.selectAll,
      parametricSelectors.getCartId,
    ],
    (checkedVendorItems, cartId) =>
      checkedVendorItems.filter(({ checkedVendors }) =>
        checkedVendors.includes(cartId)
      )
  );
}

export const draftSafeSelectors = new DraftSafeSelectors();
