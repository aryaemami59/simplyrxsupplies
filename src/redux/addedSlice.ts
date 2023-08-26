import type { PayloadAction, Update } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type {
  AddedState,
  Cart,
  CartItems,
  ItemIdAndCheckedVendorIds,
  ItemIdAndVendorId,
  SearchResultsItem,
} from "../types/redux";
import { cartAdapter } from "./adapters/cartAdapter";
import {
  cartItemsAdapter,
  initialCartItemsAdapterState,
} from "./adapters/cartItemsAdapter";
import { categoriesAdapter } from "./adapters/categoriesAdapter";
import { itemsAdapter } from "./adapters/itemsAdapter";
import { searchResultsAdapter } from "./adapters/searchResultsAdapter";
import { vendorsAdapter } from "./adapters/vendorsAdapter";
import { apiSlice } from "./apiSlice";
import {
  draftSafeSelectors,
  localizedSelectors,
  simpleSelectors,
} from "./draftSafeSelectors";

export const initialState: AddedState = {
  searchResults: searchResultsAdapter.getInitialState(),
  cart: cartAdapter.getInitialState(),
  categories: categoriesAdapter.getInitialState(),
  items: itemsAdapter.getInitialState(),
  vendors: vendorsAdapter.getInitialState(),
} satisfies AddedState;

export const addedSlice = createSlice({
  // selectors: { selectSearchResults: added => added.searchResults },
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
              initialCartItemsAdapterState,
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
    setSearchResults: (state, action: PayloadAction<SearchResultsItem[]>) => {
      searchResultsAdapter.setAll(state.searchResults, action.payload);
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
      if (searchResultItem) {
        const newCheckedVendors = searchResultItem.checkedVendors.includes(
          vendorId
        )
          ? searchResultItem.checkedVendors.filter(e => e !== vendorId)
          : searchResultItem.checkedVendors.concat(vendorId);
        searchResultsAdapter.updateOne(state.searchResults, {
          id: itemId,
          changes: { checkedVendors: newCheckedVendors },
        });
      }
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
      const allSearchResultItems =
        localizedSelectors.searchResults.selectAll(state);
      const searchResultItemsByVendor = allSearchResultItems.filter(
        ({ id }) =>
          !!localizedSelectors.items
            .selectById(state, id)
            ?.vendors.includes(vendorId)
      );
      const updates = searchResultItemsByVendor.map<
        Update<SearchResultsItem, number>
      >(({ id, checkedVendors }) => ({
        id,
        changes: {
          checkedVendors: [...new Set(checkedVendors.concat(vendorId))],
        },
      }));
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
              checkedVendors: checkedVendors.filter(e => e !== vendorId),
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
        const { categories, items, vendors, cart } = action.payload;
        itemsAdapter.setAll(state.items, items);
        vendorsAdapter.setAll(state.vendors, vendors);
        categoriesAdapter.setAll(state.categories, categories);
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

// export const { selectSearchResults } = addedSlice.selectors;

export default addedSlice.reducer;
