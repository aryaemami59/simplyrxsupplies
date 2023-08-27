import type { PayloadAction, Update } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type {
  AddedState,
  Cart,
  CartItems,
  CheckedVendors,
  ItemIdAndCheckedVendorIds,
  ItemIdAndVendorId,
  ItemIdAndVendorIds,
  SearchResultsItem,
} from "../types/redux";
import cartAdapter from "./adapters/cartAdapter";
import cartItemsAdapter from "./adapters/cartItemsAdapter";
import checkedVendorsAdapter from "./adapters/checkedVendorsAdapter";
import searchResultsAdapter from "./adapters/searchResultsAdapter";
import apiSlice from "./apiSlice";
import {
  draftSafeSelectors,
  localizedSelectors,
  simpleSelectors,
} from "./draftSafeSelectors";
import initialStates from "./initialStates";

const initialState: AddedState = {
  searchResults: initialStates.searchResults,
  cart: initialStates.cart,
  // categories: initialStates.categories,
  // items: initialStates.items,
  // vendors: initialStates.vendors,
} satisfies AddedState;

const addedSlice = createSlice({
  selectors: { selectSearchResults: added => added.searchResults },
  name: "added",
  initialState,
  reducers: {
    addItemToCarts: (
      state,
      action: PayloadAction<ItemIdAndCheckedVendorIds>
    ) => {
      const { checkedVendorIds, itemId } = action.payload;
      const updates = checkedVendorIds.map<Update<Cart, number>>(id => ({
        id,
        changes: {
          items: cartItemsAdapter.addOne(
            localizedSelectors.cart.selectById(state, id)?.items ??
              initialStates.cartItems,
            {
              id: itemId,
              minimized: false,
              vendorId: id,
            }
          ),
          id,
        },
      }));
      cartAdapter.updateMany(state.cart, updates);
      searchResultsAdapter.removeOne(state.searchResults, itemId);
    },
    deleteOneItemFromCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      cartAdapter.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: cartItemsAdapter.removeOne(cartItems, itemId),
        },
      });
    },
    removeAllItemsFromCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      cartAdapter.updateOne(state.cart, {
        changes: { items: cartItemsAdapter.removeAll(cartItems) },
        id: vendorId,
      });
    },
    setSearchResults: (state, action: PayloadAction<ItemIdAndVendorIds[]>) => {
      const { payload: itemIdAndVendorIds } = action;

      const element = itemIdAndVendorIds.map<SearchResultsItem>(
        ({ itemId, vendorIds }) => ({
          id: itemId,
          checkedVendors: checkedVendorsAdapter.upsertMany(
            initialStates.checkedVendors,
            vendorIds.map<CheckedVendors>(e => ({
              id: e,
              checked: !simpleSelectors.cartItems
                .selectIds(localizedSelectors.cart.selectById(state, e)?.items)
                .includes(itemId),
            }))
          ),
        })
      );
      searchResultsAdapter.setAll(state.searchResults, element);
    },
    clearSearchResults: state => {
      searchResultsAdapter.removeAll(state.searchResults);
    },
    toggleVendorForOneSearchResultItem: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const searchResultItem = localizedSelectors.searchResults.selectById(
        state,
        itemId
      );
      // if (searchResultItem) {
      const newCheckedVendors = checkedVendorsAdapter.updateOne(
        searchResultItem.checkedVendors,
        {
          id: vendorId,
          changes: {
            checked: !simpleSelectors.checkedVendors.selectById(
              searchResultItem.checkedVendors,
              vendorId
            )?.checked,
          },
        }
      );
      // : checkedVendorsAdapter.updateOne(searchResultItem.checkedVendors, {
      //     id: vendorId,
      //     changes: { checked: true },
      //   });
      searchResultsAdapter.updateOne(state.searchResults, {
        id: itemId,
        changes: { checkedVendors: newCheckedVendors },
      });
      // }
    },
    toggleMinimizeOneItemInCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const cartItems = draftSafeSelectors.selectCartItems(state, vendorId);
      const cartItem = simpleSelectors.cartItems.selectById(cartItems, itemId);
      if (cartItem) {
        cartAdapter.updateOne(state.cart, {
          id: vendorId,
          changes: {
            items: cartItemsAdapter.updateOne(cartItems, {
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
      const allCartItems = simpleSelectors.cartItems.selectAll(cartItems);
      cartAdapter.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: cartItemsAdapter.updateMany(
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
      const allCartItems = simpleSelectors.cartItems.selectAll(cartItems);
      cartAdapter.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: cartItemsAdapter.updateMany(
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
      const updates = needToBeUpdated.map<Update<SearchResultsItem, number>>(
        ({ checkedVendors, id }) => ({
          id,
          changes: {
            checkedVendors: checkedVendorsAdapter.updateOne(checkedVendors, {
              id: vendorId,
              changes: { checked: true },
            }),
          },
        })
      );
      searchResultsAdapter.updateMany(state.searchResults, updates);
    },
    unCheckOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const searchResultItemsByVendor =
        draftSafeSelectors.selectSearchResultsByVendorId(state, vendorId);
      searchResultsAdapter.updateMany(
        state.searchResults,
        searchResultItemsByVendor.map<Update<SearchResultsItem, number>>(
          ({ id, checkedVendors }) => ({
            id,
            changes: {
              checkedVendors: checkedVendorsAdapter.updateOne(checkedVendors, {
                id: vendorId,
                changes: { checked: false },
              }),
            },
          })
        )
      );
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.getMain.matchFulfilled,
      (state, action) => {
        const { cart } = action.payload;
        // itemsAdapter.setAll(state.items, items);
        // vendorsAdapter.setAll(state.vendors, vendors);
        // categoriesAdapter.setAll(state.categories, categories);
        cartAdapter.setAll(state.cart, cart);
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

export const { selectSearchResults } = addedSlice.selectors;

export const { reducer: addedReducer } = addedSlice;

export default addedSlice;
