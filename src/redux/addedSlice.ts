import type { PayloadAction, Update } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type {
  AddedState,
  CartItems,
  ItemIdAndCheckedVendorIds,
  ItemIdAndVendorId,
  SearchResultsItem,
} from "../types/redux";
import { cartAdapter } from "./adapters/cartAdapter";
import { cartItemsAdapter } from "./adapters/cartItemsAdapter";
import { categoriesAdapter } from "./adapters/categoriesAdapter";
import { itemsAdapter } from "./adapters/itemsAdapter";
import { searchResultsAdapter } from "./adapters/searchResultsAdapter";
import { vendorsAdapter } from "./adapters/vendorsAdapter";
import { apiSlice } from "./apiSlice";
import { cartItemsAdapterSelectors } from "./selectors";

export const initialState: AddedState = {
  searchResults: searchResultsAdapter.getInitialState(),
  cart: cartAdapter.getInitialState(),
  categories: categoriesAdapter.getInitialState(),
  items: itemsAdapter.getInitialState(),
  vendors: vendorsAdapter.getInitialState(),
} satisfies AddedState;

const cartAdapterLocalizedSelectors = cartAdapter.getSelectors<AddedState>(
  added => added.cart
);

const itemsAdapterLocalizedSelectors = itemsAdapter.getSelectors<AddedState>(
  added => added.items
);

const searchResultsAdapterLocalizedSelectors =
  searchResultsAdapter.getSelectors<AddedState>(added => added.searchResults);

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    addItemToCarts: (
      state,
      action: PayloadAction<ItemIdAndCheckedVendorIds>
    ) => {
      const { checkedVendorIds, itemId } = action.payload;
      const carts = checkedVendorIds.map(e =>
        cartAdapterLocalizedSelectors.selectById(state, e)
      );
      // .filter<Cart>((a): a is Cart => !!a);
      const newCarts = carts.map(e => ({
        items: cartItemsAdapter.addOne(e.items, {
          id: itemId,
          minimized: false,
          vendorId: e.id,
        }),
        id: e.id,
      }));
      cartAdapter.upsertMany(state.cart, newCarts);
    },
    deleteOneItemFromCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>
    ) => {
      const { itemId, vendorId } = action.payload;
      const cart = cartAdapterLocalizedSelectors.selectById(state, vendorId);
      // if (cart) {
      const cartItem = cartItemsAdapterSelectors.selectById(cart.items, itemId);
      // if (cartItem) {
      cartAdapter.updateOne(state.cart, {
        id: vendorId,
        changes: {
          items: cartItemsAdapter.removeOne(cart.items, cartItem.id),
        },
      });
      // }
      // }
    },
    removeAllItemsFromCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cart = cartAdapterLocalizedSelectors.selectById(state, vendorId);
      // if (cart) {
      cartAdapter.updateOne(state.cart, {
        changes: { items: cartItemsAdapter.removeAll(cart.items) },
        id: vendorId,
      });
      // }
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
      const searchResultItem =
        searchResultsAdapterLocalizedSelectors.selectById(state, itemId);
      // if (searchResultItem) {
      const newCheckedVendors = searchResultItem.checkedVendors.includes(
        vendorId
      )
        ? searchResultItem.checkedVendors.filter(e => e !== vendorId)
        : searchResultItem.checkedVendors.concat(vendorId);
      searchResultsAdapter.updateOne(state.searchResults, {
        id: itemId,
        changes: { checkedVendors: newCheckedVendors },
      });
      // }
    },
    minimizeOneItemInCart: (
      state,
      action: PayloadAction<{ itemId: number; vendorId: number }>
    ) => {
      const { itemId, vendorId } = action.payload;
      const cart = cartAdapterLocalizedSelectors.selectById(state, vendorId);
      // if (cart) {
      const cartItem = cartItemsAdapterSelectors.selectById(cart.items, itemId);
      // if (cartItem) {
      const element = cartItemsAdapter.updateOne(cart.items, {
        id: itemId,
        changes: { minimized: !cartItem.minimized },
      });
      cartAdapter.updateOne(state.cart, {
        id: vendorId,
        changes: { items: element },
      });
      // }
      // }
    },
    minimizeAllItemsInCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cart = cartAdapterLocalizedSelectors.selectById(state, vendorId);
      // if (cart) {
      const newCartItems = cartItemsAdapterSelectors
        .selectAll(cart.items)
        .map(e => ({ ...e, minimized: true }));
      const updates = newCartItems.map<Update<CartItems, number>>(e => ({
        id: e.id,
        changes: { minimized: e.minimized },
      }));
      cartAdapter.updateOne(state.cart, {
        id: vendorId,
        changes: { items: cartItemsAdapter.updateMany(cart.items, updates) },
      });
      // }
    },
    maximizeAllItemsInCart: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const cart = cartAdapterLocalizedSelectors.selectById(state, vendorId);
      // if (cart) {
      const newCartItems = cartItemsAdapterSelectors
        .selectAll(cart.items)
        .map(e => ({ ...e, minimized: false }));
      const updates = newCartItems.map<Update<CartItems, number>>(e => ({
        id: e.id,
        changes: { minimized: e.minimized },
      }));
      cartAdapter.updateOne(state.cart, {
        id: vendorId,
        changes: { items: cartItemsAdapter.updateMany(cart.items, updates) },
      });
      // }
    },
    checkOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const allSearchResultItems =
        searchResultsAdapterLocalizedSelectors.selectAll(state);
      const searchResultItemsByVendor = allSearchResultItems.filter(e =>
        itemsAdapterLocalizedSelectors
          .selectById(state, e.id)
          .vendors.includes(vendorId)
      );
      const updates = searchResultItemsByVendor.map<
        Update<SearchResultsItem, number>
      >(e => ({
        id: e.id,
        changes: {
          checkedVendors: [...new Set(e.checkedVendors.concat(vendorId))],
        },
      }));
      searchResultsAdapter.updateMany(state.searchResults, updates);
    },
    unCheckOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>
    ) => {
      const { vendorId } = action.payload;
      const allSearchResultItems =
        searchResultsAdapterLocalizedSelectors.selectAll(state);
      const searchResultItemsByVendor = allSearchResultItems.filter(e =>
        itemsAdapterLocalizedSelectors
          .selectById(state, e.id)
          .vendors.includes(vendorId)
      );
      const updates = searchResultItemsByVendor.map<
        Update<SearchResultsItem, number>
      >(e => ({
        id: e.id,
        changes: {
          checkedVendors: e.checkedVendors.filter(a => a !== vendorId),
        },
      }));
      searchResultsAdapter.updateMany(state.searchResults, updates);
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
  minimizeOneItemInCart,
  minimizeAllItemsInCart,
  maximizeAllItemsInCart,
  checkOneVendorForAllSearchResults,
  unCheckOneVendorForAllSearchResults,
} = addedSlice.actions;

export default addedSlice.reducer;
