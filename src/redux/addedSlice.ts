import type { PayloadAction, Update } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type {
  AddedState,
  Cart,
  CartItems,
  ItemIdAndVendorId,
  ItemVendors,
  SearchResultsItem,
} from "../types/reduxHelperTypes"
import { EMPTY_ARRAY } from "../utils/emptyArray"
import { isEmptyArray } from "../utils/predicates/isEmptyArray"
import { toggleArrayElement } from "../utils/toggleArrayElement"
import {
  withNumsArrayConcat,
  withNumsArrayFilter,
} from "../utils/withNumsArrayRuntimeChecks"
import { ADAPTER_INITIAL_STATES } from "./adapterInitialStates"
import { ADAPTER_SELECTORS } from "./adapterSelectors"
import { endpoints } from "./apiSlice"
import { DRAFT_SAFE_SELECTORS } from "./draftSafeSelectors"
import { ENTITY_ADAPTERS } from "./entityAdapters"

export const resetCheckedVendorIds = (itemVendors: ItemVendors) => {
  const itemVendorsUpdate: Update<ItemVendors, number> = {
    id: itemVendors.id,
    changes: {
      checkedVendorIds: itemVendors.vendorIds,
    },
  }
  return itemVendorsUpdate
}

export const initialState: AddedState = {
  searchResults: ADAPTER_INITIAL_STATES.searchResults,
  cart: ADAPTER_INITIAL_STATES.cart,
  itemVendors: ADAPTER_INITIAL_STATES.itemVendors,
  cartItems: ADAPTER_INITIAL_STATES.cartItems,
}

export const addedSlice = createSlice({
  name: "added",
  initialState,
  reducers: {
    itemAddedToCarts: (state, action: PayloadAction<{ itemId: number }>) => {
      const { itemId } = action.payload
      const itemVendors = ADAPTER_SELECTORS.LOCAL.itemVendors.selectById(
        state,
        itemId,
      )
      const checkedVendorIds = DRAFT_SAFE_SELECTORS.selectCheckedVendorIds(
        state,
        itemId,
      )
      if (isEmptyArray(checkedVendorIds)) {
        return
      }
      const carts = DRAFT_SAFE_SELECTORS.selectCartsByCheckedVendors(
        state,
        itemId,
      )
      const cartUpdates = carts.map<Update<Cart, number>>(
        ({ id, itemIds }) => ({
          id,
          changes: {
            itemIds: withNumsArrayConcat(itemIds.concat(itemId)),
          },
        }),
      )
      if (itemVendors) {
        // console.log(vendorIds);
        const itemVendorsUpdate: Update<ItemVendors, number> = {
          id: itemId,
          changes: {
            checkedVendorIds: itemVendors.vendorIds,
          },
        }
        ENTITY_ADAPTERS.itemVendors.updateOne(
          state.itemVendors,
          itemVendorsUpdate,
        )
      }
      ENTITY_ADAPTERS.cart.updateMany(state.cart, cartUpdates)
      ENTITY_ADAPTERS.searchResults.removeOne(state.searchResults, itemId)
    },

    singleItemRemovedFromCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>,
    ) => {
      const { itemId, vendorId } = action.payload
      const cartItems = DRAFT_SAFE_SELECTORS.selectCartItems(state, vendorId)
      const cartUpdate: Update<Cart, number> = {
        id: vendorId,
        changes: {
          itemIds: withNumsArrayFilter(cartItems.filter(id => id !== itemId)),
        },
      }
      ENTITY_ADAPTERS.cart.updateOne(state.cart, cartUpdate)
    },

    allItemsRemovedFromCart: (
      state,
      action: PayloadAction<{ vendorId: number }>,
    ) => {
      const { vendorId } = action.payload
      const cartUpdate: Update<Cart, number> = {
        id: vendorId,
        changes: { itemIds: EMPTY_ARRAY },
      }
      ENTITY_ADAPTERS.cart.updateOne(state.cart, cartUpdate)
    },

    searchResultsUpdated: (state, action: PayloadAction<number[]>) => {
      const { payload: itemIds } = action
      const newSearchResults = itemIds.map<SearchResultsItem>(id => ({
        id,
      }))
      ENTITY_ADAPTERS.searchResults.setAll(
        state.searchResults,
        newSearchResults,
      )
    },

    searchResultsCleared: state => {
      ENTITY_ADAPTERS.searchResults.removeAll(state.searchResults)
    },

    toggledVendorForOneSearchResultItem: (
      state,
      action: PayloadAction<ItemIdAndVendorId>,
    ) => {
      const { itemId, vendorId } = action.payload
      const itemVendors = ADAPTER_SELECTORS.LOCAL.itemVendors.selectById(
        state,
        itemId,
      )
      if (!itemVendors) {
        return
      }
      const itemVendorsUpdate: Update<ItemVendors, number> = {
        id: itemId,
        changes: {
          checkedVendorIds: toggleArrayElement(
            itemVendors.checkedVendorIds,
            vendorId,
          ),
        },
      }
      ENTITY_ADAPTERS.itemVendors.updateOne(
        state.itemVendors,
        itemVendorsUpdate,
      )
    },

    toggledMinimizeOneItemInCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>,
    ) => {
      const { itemId, vendorId } = action.payload
      const cartItems = ADAPTER_SELECTORS.LOCAL.cartItems.selectById(
        state,
        vendorId,
      )
      if (!cartItems) {
        return
      }
      const cartItemsUpdate: Update<CartItems, number> = {
        id: vendorId,
        changes: {
          minimizedItemIds: toggleArrayElement(
            cartItems.minimizedItemIds,
            itemId,
          ),
        },
      }
      ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, cartItemsUpdate)
    },

    minimizedAllItemsInCart: (
      state,
      action: PayloadAction<{ vendorId: number }>,
    ) => {
      const { vendorId } = action.payload
      const cartItems = ADAPTER_SELECTORS.LOCAL.cartItems.selectById(
        state,
        vendorId,
      )
      if (!cartItems) {
        return
      }
      const cartItemsUpdate: Update<CartItems, number> = {
        id: vendorId,
        changes: { minimizedItemIds: cartItems.itemIds },
      }
      ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, cartItemsUpdate)
    },

    maximizedAllItemsInCart: (
      state,
      action: PayloadAction<{ vendorId: number }>,
    ) => {
      const { vendorId } = action.payload
      const cartItems = ADAPTER_SELECTORS.LOCAL.cartItems.selectById(
        state,
        vendorId,
      )
      if (!cartItems) {
        return
      }
      const cartItemsUpdate: Update<CartItems, number> = {
        id: vendorId,
        changes: { minimizedItemIds: EMPTY_ARRAY },
      }
      ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, cartItemsUpdate)
    },

    checkedOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>,
    ) => {
      const { vendorId } = action.payload
      const itemVendors = DRAFT_SAFE_SELECTORS.selectUnCheckedItemVendors(
        state,
        vendorId,
      )
      const itemVendorsUpdates = itemVendors.map<Update<ItemVendors, number>>(
        ({ checkedVendorIds, id }) => ({
          id,
          changes: {
            checkedVendorIds: withNumsArrayConcat(
              checkedVendorIds.concat(vendorId),
            ),
          },
        }),
      )
      ENTITY_ADAPTERS.itemVendors.updateMany(
        state.itemVendors,
        itemVendorsUpdates,
      )
    },

    unCheckedOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>,
    ) => {
      const { vendorId } = action.payload
      const itemVendors = DRAFT_SAFE_SELECTORS.selectItemVendorsByVendorId(
        state,
        vendorId,
      )
      const itemVendorsUpdates = itemVendors.map<Update<ItemVendors, number>>(
        ({ checkedVendorIds, id }) => ({
          id,
          changes: {
            checkedVendorIds: withNumsArrayFilter(
              checkedVendorIds.filter(
                checkedVendorId => checkedVendorId !== vendorId,
              ),
            ),
          },
        }),
      )
      ENTITY_ADAPTERS.itemVendors.updateMany(
        state.itemVendors,
        itemVendorsUpdates,
      )
    },
  },

  extraReducers: builder => {
    builder.addMatcher(endpoints.getMain.matchFulfilled, (state, action) => {
      const { cart, items, vendors } = action.payload
      ENTITY_ADAPTERS.cart.setAll(state.cart, cart)
      ENTITY_ADAPTERS.itemVendors.setAll(
        state.itemVendors,
        items.map<ItemVendors>(({ id, vendorIds }) => ({
          id,
          checkedVendorIds: vendorIds,
          vendorIds,
        })),
      )
      ENTITY_ADAPTERS.cartItems.setAll(
        state.cartItems,
        vendors.map<CartItems>(({ id, itemIds }) => ({
          id,
          itemIds,
          minimizedItemIds: EMPTY_ARRAY,
        })),
      )
    })
  },
})

export const {
  itemAddedToCarts,
  singleItemRemovedFromCart,
  searchResultsUpdated,
  searchResultsCleared,
  toggledVendorForOneSearchResultItem,
  allItemsRemovedFromCart,
  toggledMinimizeOneItemInCart,
  minimizedAllItemsInCart,
  maximizedAllItemsInCart,
  checkedOneVendorForAllSearchResults,
  unCheckedOneVendorForAllSearchResults,
} = addedSlice.actions
