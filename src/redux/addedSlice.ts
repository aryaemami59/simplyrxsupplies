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
import toggleArrayElement from "../utils/toggleArrayElement";
import ADAPTER_INITIAL_STATES from "./adapterInitialStates";
import { ADAPTER_SELECTORS } from "./adapterSelectors";
import apiSlice from "./apiSlice";
import { draftSafeSelectors } from "./draftSafeSelectors";
import ENTITY_ADAPTERS from "./entityAdapters";

const initialState: AddedState = {
  searchResults: ADAPTER_INITIAL_STATES.searchResults,
  cart: ADAPTER_INITIAL_STATES.cart,
  itemVendors: ADAPTER_INITIAL_STATES.itemVendors,
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
      if (itemVendors) {
        const updates = itemVendors.checkedVendors.map<Update<Cart, number>>(
          id => ({
            id,
            changes: {
              items: ENTITY_ADAPTERS.cartItems.addOne(
                ADAPTER_SELECTORS.LOCAL.cart.selectById(state, id)?.items ??
                  ADAPTER_INITIAL_STATES.cartItems,
                {
                  id: itemId,
                  minimized: false,
                  vendorId: id,
                }
              ),
            },
          })
        );
        ENTITY_ADAPTERS.cart.updateMany(state.cart, updates);
        ENTITY_ADAPTERS.itemVendors.updateOne(state.itemVendors, {
          id: itemId,
          changes: {
            checkedVendors: itemVendors.vendors,
          },
        });
        ENTITY_ADAPTERS.searchResults.removeOne(state.searchResults, itemId);
      }
    },
    deleteOneItemFromCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      ENTITY_ADAPTERS.cart.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: ENTITY_ADAPTERS.cartItems.removeOne(cartItems, itemId),
        },
      });
    },
    removeAllItemsFromCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      ENTITY_ADAPTERS.cart.updateOne(state.cart, {
        changes: { items: ENTITY_ADAPTERS.cartItems.removeAll(cartItems) },
        id: vendorId,
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
            checkedVendors: toggleArrayElement(
              itemVendors.checkedVendors,
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
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      const cartItem = ADAPTER_SELECTORS.SIMPLE.cartItems.selectById(
        cartItems,
        itemId
      );
      if (cartItem) {
        ENTITY_ADAPTERS.cart.updateOne(state.cart, {
          id: vendorId,
          changes: {
            items: ENTITY_ADAPTERS.cartItems.updateOne(cartItems, {
              id: itemId,
              changes: { minimized: !cartItem.minimized },
            }),
          },
        });
      }
    },
    minimizeAllItemsInCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      const allCartItems =
        ADAPTER_SELECTORS.SIMPLE.cartItems.selectAll(cartItems);
      ENTITY_ADAPTERS.cart.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: ENTITY_ADAPTERS.cartItems.updateMany(
            cartItems,
            allCartItems.map<Update<CartItems, number>>(({ id }) => ({
              id,
              changes: { minimized: true },
            }))
          ),
        },
      });
    },
    maximizeAllItemsInCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      const allCartItems =
        ADAPTER_SELECTORS.SIMPLE.cartItems.selectAll(cartItems);
      ENTITY_ADAPTERS.cart.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: ENTITY_ADAPTERS.cartItems.updateMany(
            cartItems,
            allCartItems.map<Update<CartItems, number>>(({ id }) => ({
              id,
              changes: { minimized: false },
            }))
          ),
        },
      });
    },
    checkOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const needToBeUpdated = draftSafeSelectors.selectUnCheckedVendorIds(
        state,
        vendorId
      );
      const updates = needToBeUpdated.map<Update<ItemVendors, number>>(
        ({ checkedVendors, id }) => ({
          id,
          changes: {
            checkedVendors: checkedVendors.concat(vendorId),
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
        draftSafeSelectors.selectSearchResultsByVendorId(state, vendorId);
      const updates = searchResultItemsByVendorId.map<
        Update<ItemVendors, number>
      >(({ checkedVendors, id }) => ({
        id,
        changes: {
          checkedVendors: checkedVendors.filter(
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
        const { cart, items } = action.payload;
        ENTITY_ADAPTERS.cart.setAll(state.cart, cart);
        ENTITY_ADAPTERS.itemVendors.setAll(
          state.itemVendors,
          items.map<ItemVendors>(({ id, vendors }) => ({
            id,
            checkedVendors: vendors,
            vendors,
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