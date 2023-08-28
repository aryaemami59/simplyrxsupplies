import type { PayloadAction, Update } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AddedState } from "../types/AddedState";
import type {
  Cart,
  CartItem,
  CheckedVendorItem,
  ItemIdAndVendorId,
  SearchResultsItem,
} from "../types/redux";
import ADAPTERS from "./adapters/Adapters";
import apiSlice from "./apiSlice";
import { draftSafeSelectors, SELECTORS } from "./draftSafeSelectors";
import INITIAL_STATES from "./initialStates";

const initialState: AddedState = {
  searchResults: INITIAL_STATES.searchResults,
  cart: INITIAL_STATES.cart,
  checkedVendorItems: INITIAL_STATES.checkedVendorItems,
} satisfies AddedState;

const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItemToCarts: (state, action: PayloadAction<{ itemId: number }>) => {
      const { itemId } = action.payload;
      const checkedVendorItems = SELECTORS.LOCAL.checkedVendorItems.selectById(
        state,
        itemId
      );
      if (checkedVendorItems) {
        const updates = checkedVendorItems.checkedVendors.map<
          Update<Cart, number>
        >(id => ({
          id,
          changes: {
            items: ADAPTERS.cartItems.addOne(
              SELECTORS.LOCAL.cart.selectById(state, id)?.items ??
                INITIAL_STATES.cartItems,
              {
                id: itemId,
                minimized: false,
                vendorId: id,
              }
            ),
          },
        }));
        ADAPTERS.cart.updateMany(state.cart, updates);
        ADAPTERS.checkedVendorItems.updateOne(state.checkedVendorItems, {
          id: itemId,
          changes: {
            checkedVendors: checkedVendorItems.vendors,
          },
        });
        ADAPTERS.searchResults.removeOne(state.searchResults, itemId);
      }
    },
    deleteOneItemFromCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      ADAPTERS.cart.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: ADAPTERS.cartItems.removeOne(cartItems, itemId),
        },
      });
    },
    removeAllItemsFromCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      ADAPTERS.cart.updateOne(state.cart, {
        changes: { items: ADAPTERS.cartItems.removeAll(cartItems) },
        id: vendorId,
      });
    },
    setSearchResults: (state, action: PayloadAction<number[]>) => {
      const { payload: itemIds } = action;
      const newEntities = itemIds.map<SearchResultsItem>(id => ({
        id,
      }));
      ADAPTERS.searchResults.setAll(state.searchResults, newEntities);
    },
    clearSearchResults: state => {
      ADAPTERS.searchResults.removeAll(state.searchResults);
    },
    toggleVendorForOneSearchResultItem: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const checkedVendorItems = SELECTORS.LOCAL.checkedVendorItems.selectById(
        state,
        itemId
      );
      if (checkedVendorItems) {
        ADAPTERS.checkedVendorItems.updateOne(state.checkedVendorItems, {
          id: itemId,
          changes: {
            checkedVendors: checkedVendorItems.checkedVendors.includes(vendorId)
              ? checkedVendorItems.checkedVendors.filter(e => e !== vendorId)
              : checkedVendorItems.checkedVendors.concat(vendorId),
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
      const cartItem = SELECTORS.SIMPLE.cartItems.selectById(cartItems, itemId);
      if (cartItem) {
        ADAPTERS.cart.updateOne(state.cart, {
          id: vendorId,
          changes: {
            items: ADAPTERS.cartItems.updateOne(cartItems, {
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
      const allCartItems = SELECTORS.SIMPLE.cartItems.selectAll(cartItems);
      ADAPTERS.cart.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: ADAPTERS.cartItems.updateMany(
            cartItems,
            allCartItems.map<Update<CartItem, number>>(({ id }) => ({
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
      const allCartItems = SELECTORS.SIMPLE.cartItems.selectAll(cartItems);
      ADAPTERS.cart.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: ADAPTERS.cartItems.updateMany(
            cartItems,
            allCartItems.map<Update<CartItem, number>>(({ id }) => ({
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
      // console.log(needToBeUpdated);
      const updates = needToBeUpdated.map<Update<CheckedVendorItem, number>>(
        ({ checkedVendors, id }) => ({
          id,
          changes: {
            checkedVendors: checkedVendors.concat(vendorId),
          },
        })
      );
      ADAPTERS.checkedVendorItems.updateMany(state.checkedVendorItems, updates);
    },
    unCheckOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const searchResultItemsByVendorId =
        draftSafeSelectors.selectSearchResultsByVendorId(state, vendorId);
      const updates = searchResultItemsByVendorId.map<
        Update<CheckedVendorItem, number>
      >(({ checkedVendors, id }) => ({
        id,
        changes: {
          checkedVendors: checkedVendors.filter(
            checkedVendorId => checkedVendorId !== vendorId
          ),
        },
      }));
      ADAPTERS.checkedVendorItems.updateMany(state.checkedVendorItems, updates);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.getMain.matchFulfilled,
      (state, action) => {
        const { cart, items } = action.payload;
        ADAPTERS.cart.setAll(state.cart, cart);
        ADAPTERS.checkedVendorItems.setAll(
          state.checkedVendorItems,
          items.map<CheckedVendorItem>(({ id, vendors }) => ({
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
