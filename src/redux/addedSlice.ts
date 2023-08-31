import type { PayloadAction, Update } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AddedState } from "../types/AddedState";
import type {
  Cart,
  CartItems,
  ItemIdAndVendorId,
  ItemVendors,
  SearchResultsItem,
} from "../types/redux";
import EMPTY_ARRAY from "../utils/emptyArray";
import toggleArrayElement from "../utils/toggleArrayElement";
import ADAPTER_INITIAL_STATES from "./adapterInitialStates";
import { ADAPTER_SELECTORS } from "./adapterSelectors";
import apiSlice from "./apiSlice";
import { DRAFT_SAFE_SELECTORS } from "./draftSafeSelectors";
import ENTITY_ADAPTERS from "./entityAdapters";

const initialState: AddedState = {
  searchResults: ADAPTER_INITIAL_STATES.searchResults,
  cart: ADAPTER_INITIAL_STATES.cart,
  itemVendors: ADAPTER_INITIAL_STATES.itemVendors,
  cartItems: ADAPTER_INITIAL_STATES.cartItems,
};

const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItemToCarts: (state, action: PayloadAction<{ itemId: number }>) => {
      const { itemId } = action.payload;
      const itemVendors = ADAPTER_SELECTORS.LOCAL.itemVendors.selectById(
        state,
        itemId
      );
      const carts = DRAFT_SAFE_SELECTORS.selectCartsByCheckedVendors(
        state,
        itemId
      );
      const updates = carts.map<Update<Cart, number>>(cart => ({
        id: cart.id,
        changes: {
          itemIds: [...new Set(cart.itemIds.concat(itemId))],
        },
      }));
      ENTITY_ADAPTERS.cart.updateMany(state.cart, updates);
      if (itemVendors) {
        ENTITY_ADAPTERS.itemVendors.updateOne(state.itemVendors, {
          id: itemId,
          changes: {
            checkedVendorIds: itemVendors.vendorIds,
          },
        });
      }
      ENTITY_ADAPTERS.searchResults.removeOne(state.searchResults, itemId);
    },
    deleteOneItemFromCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const cartItems = DRAFT_SAFE_SELECTORS.selectCartItems(state, vendorId);
      ENTITY_ADAPTERS.cart.updateOne(state.cart, {
        id: vendorId,
        changes: {
          itemIds: cartItems.filter(id => id !== itemId),
        },
      });
    },
    removeAllItemsFromCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      ENTITY_ADAPTERS.cart.updateOne(state.cart, {
        id: vendorId,
        changes: { itemIds: EMPTY_ARRAY },
      });
    },
    setSearchResults: (state, action: PayloadAction<number[]>) => {
      const { payload: itemIds } = action;
      const newEntities = itemIds.map<SearchResultsItem>(id => ({
        id,
      }));
      ENTITY_ADAPTERS.searchResults.setAll(state.searchResults, newEntities);
    },
    clearSearchResults: state => {
      ENTITY_ADAPTERS.searchResults.removeAll(state.searchResults);
    },
    toggleVendorForOneSearchResultItem: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const itemVendors = ADAPTER_SELECTORS.LOCAL.itemVendors.selectById(
        state,
        itemId
      );
      if (itemVendors) {
        ENTITY_ADAPTERS.itemVendors.updateOne(state.itemVendors, {
          id: itemId,
          changes: {
            checkedVendorIds: toggleArrayElement(
              itemVendors.checkedVendorIds,
              vendorId
            ),
          },
        });
      }
    },
    toggleMinimizeOneItemInCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const cartItems = ADAPTER_SELECTORS.LOCAL.cartItems.selectById(
        state,
        vendorId
      );
      if (cartItems) {
        ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, {
          id: vendorId,
          changes: {
            minimizedItemIds: toggleArrayElement(
              cartItems.minimizedItemIds,
              itemId
            ),
          },
        });
      }
    },
    minimizeAllItemsInCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cartItems = ADAPTER_SELECTORS.LOCAL.cartItems.selectById(
        state,
        vendorId
      );
      if (cartItems) {
        ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, {
          id: vendorId,
          changes: { minimizedItemIds: [...cartItems.itemIds] },
        });
      }
    },
    maximizeAllItemsInCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cartItems = ADAPTER_SELECTORS.LOCAL.cartItems.selectById(
        state,
        vendorId
      );
      if (cartItems) {
        ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, {
          id: vendorId,
          changes: { minimizedItemIds: EMPTY_ARRAY },
        });
      }
    },
    checkOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const needToBeUpdated = DRAFT_SAFE_SELECTORS.selectUnCheckedVendorIds(
        state,
        vendorId
      );
      const updates = needToBeUpdated.map<Update<ItemVendors, number>>(
        ({ checkedVendorIds, id }) => ({
          id,
          changes: {
            checkedVendorIds: [...new Set(checkedVendorIds.concat(vendorId))],
          },
        })
      );
      ENTITY_ADAPTERS.itemVendors.updateMany(state.itemVendors, updates);
    },
    unCheckOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const searchResultItemsByVendorId =
        DRAFT_SAFE_SELECTORS.selectSearchResultsByVendorId(state, vendorId);
      const updates = searchResultItemsByVendorId.map<
        Update<ItemVendors, number>
      >(({ checkedVendorIds, id }) => ({
        id,
        changes: {
          checkedVendorIds: checkedVendorIds.filter(
            checkedVendorId => checkedVendorId !== vendorId
          ),
        },
      }));
      ENTITY_ADAPTERS.itemVendors.updateMany(state.itemVendors, updates);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.getMain.matchFulfilled,
      (state, action) => {
        const { cart, items, vendors } = action.payload;
        ENTITY_ADAPTERS.cart.setAll(state.cart, cart);
        ENTITY_ADAPTERS.itemVendors.setAll(
          state.itemVendors,
          items.map<ItemVendors>(({ id, vendors: itemVendors }) => ({
            id,
            checkedVendorIds: itemVendors,
            vendorIds: itemVendors,
          }))
        );
        ENTITY_ADAPTERS.cartItems.setAll(
          state.cartItems,
          vendors.map<CartItems>(({ id, itemIds }) => ({
            id,
            itemIds,
            minimizedItemIds: EMPTY_ARRAY,
          }))
        );
      }
    );
  },
});

export const {
  addItemToCarts,
  deleteOneItemFromCart,
  setSearchResults,
  clearSearchResults,
  toggleVendorForOneSearchResultItem,
  removeAllItemsFromCart,
  toggleMinimizeOneItemInCart,
  minimizeAllItemsInCart,
  maximizeAllItemsInCart,
  checkOneVendorForAllSearchResults,
  unCheckOneVendorForAllSearchResults,
} = addedSlice.actions;

// export const { selectSearchResults } = addedSlice.selectors;

// export const { reducer: addedReducer } = addedSlice;

export default addedSlice;
