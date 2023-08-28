import type { AddedState } from "../types/AddedState";
import type { ItemNamesAndKeywords } from "../types/api";
import emptyArray from "../utils/emptyArray";
import ADAPTERS from "./adapters/Adapters";
import { endpoints } from "./apiSlice";
import { SELECTORS } from "./draftSafeSelectors";
import type {
  AdapterGlobalizedSelectors,
  AppSelector,
  TopLevelSelectorsForAddedState,
} from "./hooks";
import {
  createAppSelector,
  createDraftSafeRootSelector,
  RootSelectorParamsProvider,
} from "./hooks";
import INITIAL_STATES from "./initialStates";

export const ROOT_SELECTOR_PARAMS_PROVIDER: RootSelectorParamsProvider = {
  getItemId: (state, itemId) => itemId,
  getCartId: (state, cartId) => cartId,
  getCartIdAndItemId: (state, cartId, itemId) => itemId,
  getItemIdAndCartId: (state, itemId, cartId) => cartId,
} as const satisfies RootSelectorParamsProvider;

export const selectAdded: AppSelector<AddedState, never> = state => state.added;

export const selectMainResults = endpoints.getMain.select();

export const selectMainData = createDraftSafeRootSelector(
  [selectMainResults],
  results => results.data
);

export const selectItemsData = createDraftSafeRootSelector(
  [selectMainData],
  data => ADAPTERS.items.setAll(INITIAL_STATES.items, data?.items ?? emptyArray)
);

export const selectVendorsData = createDraftSafeRootSelector(
  [selectMainData],
  data =>
    ADAPTERS.vendors.setAll(INITIAL_STATES.vendors, data?.vendors ?? emptyArray)
);

export const selectCategoriesData = createDraftSafeRootSelector(
  [selectMainData],
  data =>
    ADAPTERS.categories.setAll(
      INITIAL_STATES.categories,
      data?.categories ?? emptyArray
    )
);

export const TOP_LEVEL_SELECTORS: TopLevelSelectorsForAddedState = {
  searchResults: createAppSelector([selectAdded], added => added.searchResults),

  cart: createAppSelector([selectAdded], added => added.cart),

  checkedVendorItems: createAppSelector(
    [selectAdded],
    added => added.checkedVendorItems
  ),
};

export const globalizedSelectors: AdapterGlobalizedSelectors = {
  searchResults: ADAPTERS.searchResults.getSelectors(
    TOP_LEVEL_SELECTORS.searchResults
  ),

  cart: ADAPTERS.cart.getSelectors(TOP_LEVEL_SELECTORS.cart),

  items: ADAPTERS.items.getSelectors(selectItemsData),

  vendors: ADAPTERS.vendors.getSelectors(selectVendorsData),

  categories: ADAPTERS.categories.getSelectors(selectCategoriesData),

  checkedVendorItems: ADAPTERS.checkedVendorItems.getSelectors(
    TOP_LEVEL_SELECTORS.checkedVendorItems
  ),
} as const satisfies AdapterGlobalizedSelectors;

// export const ADAPTER_SELECTORS: SelectorsWithGlobal = {
//   ...SELECTORS,
//   GLOBAL: globalizedSelectors,
// };

export const selectVendorsLinks = createAppSelector(
  [globalizedSelectors.vendors.selectById],
  vendor => vendor?.link ?? ""
);

export const selectItemNumber = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => item?.itemNumber ?? ""
);

export const selectItemSrc = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => item?.src ?? ""
);

export const selectItemName = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => item?.name ?? ""
);

export const selectVendorIdsByItemId = createAppSelector(
  [globalizedSelectors.items.selectById],
  item => item?.vendors ?? emptyArray
);

export const selectItemNamesAndKeywords = createAppSelector(
  [globalizedSelectors.items.selectAll],
  items =>
    items.map<ItemNamesAndKeywords>(({ name, keywords, id }) => ({
      name,
      keywords,
      id,
    }))
);

export const checkIfAnyItemsAdded = createAppSelector(
  [globalizedSelectors.cart.selectAll],
  carts =>
    carts.reduce<boolean>(
      (acc, curr) =>
        SELECTORS.SIMPLE.cartItems.selectTotal(curr.items) > 0 || acc,
      false
    )
);

const selectCartItems = createAppSelector(
  [globalizedSelectors.cart.selectById],
  cart => cart?.items ?? INITIAL_STATES.cartItems
);

export const selectCartItemsIds = createAppSelector(
  [selectCartItems],
  SELECTORS.SIMPLE.cartItems.selectIds
);

export const selectCartItemNamesStringified = createAppSelector(
  [selectCartItemsIds, globalizedSelectors.items.selectEntities],
  (cartItemIds, itemsEntities) =>
    cartItemIds.map<string>(e => itemsEntities[e]?.name ?? "").join(", ")
);

export const selectCheckedVendorIds = createAppSelector(
  [globalizedSelectors.checkedVendorItems.selectById],
  checkedVendorItem => checkedVendorItem?.checkedVendors ?? emptyArray
);

export const isVendorChecked = createAppSelector(
  [
    globalizedSelectors.checkedVendorItems.selectById,
    ROOT_SELECTOR_PARAMS_PROVIDER.getItemIdAndCartId,
  ],
  (checkedVendorItem, vendorId) =>
    !!checkedVendorItem?.checkedVendors.includes(vendorId)
);

const selectCartItem = createAppSelector(
  [selectCartItems, ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId],
  SELECTORS.SIMPLE.cartItems.selectById
);

export const isMinimized = createAppSelector(
  [selectCartItem],
  cartItems => !!cartItems?.minimized
);

export const selectCategoryName = createAppSelector(
  [globalizedSelectors.categories.selectById],
  category => category?.name
);

export const selectCategoryItemIds = createAppSelector(
  [globalizedSelectors.categories.selectById],
  category => category?.itemIds ?? emptyArray
);

export const checkIfAddedToVendor = createAppSelector(
  [selectCartItemsIds, ROOT_SELECTOR_PARAMS_PROVIDER.getCartIdAndItemId],
  (cartItemsIds, itemId) => cartItemsIds.includes(itemId)
);

export const checkIfAnyAddedToOneVendor = createAppSelector(
  [selectCartItemsIds],
  cartItemsIds => cartItemsIds.length > 0
);

// const checkVendorsToAdd = createAppSelector(
//   [checkIfAddedToVendor],
//   ifVendorsAdded => !ifVendorsAdded
// );

export const selectAddedItemsLength = createAppSelector(
  [selectCartItems],
  SELECTORS.SIMPLE.cartItems.selectTotal
);

export const selectQRCodeText = createAppSelector(
  [
    selectCartItemsIds,
    globalizedSelectors.items.selectEntities,
    globalizedSelectors.vendors.selectById,
  ],
  (cartItemsIds, itemEntities, vendor) =>
    cartItemsIds.map(e => itemEntities[e]?.itemNumber).join(vendor?.joinChars)
);

export const selectOfficialName = createAppSelector(
  [globalizedSelectors.vendors.selectById],
  vendor => vendor?.officialName
);

export const selectVendorItemIds = createAppSelector(
  [globalizedSelectors.vendors.selectById],
  vendor => vendor?.itemIds ?? emptyArray
);

const selectCartsByItemId = createAppSelector(
  [globalizedSelectors.items.selectById, globalizedSelectors.cart.selectAll],
  (item, carts) => carts.filter(e => item?.vendors.includes(e.id))
);

export const checkIfAddedToAllVendors = createAppSelector(
  [selectCartsByItemId, ROOT_SELECTOR_PARAMS_PROVIDER.getItemId],
  (carts, itemId) =>
    carts.reduce<boolean>(
      (acc, curr) =>
        SELECTORS.SIMPLE.cartItems.selectIds(curr.items).includes(itemId) &&
        acc,
      true
    )
);
