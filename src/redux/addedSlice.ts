import type { PayloadAction, Update } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type {
  AddedState,
  Cart,
  CartItems,
  ItemIdAndVendorId,
  ItemVendors,
  SearchResultsItem,
} from "../types/reduxHelperTypes.js"
import { EMPTY_ARRAY } from "../utils/emptyArray.js"
import { isEmptyArray } from "../utils/predicates/isEmptyArray.js"
import { toggleArrayElement } from "../utils/toggleArrayElement.js"
import {
  withNumsArrayConcat,
  withNumsArrayFilter,
} from "../utils/withNumsArrayRuntimeChecks.js"
import { ADAPTER_INITIAL_STATES } from "./adapterInitialStates.js"
import { ADAPTER_SELECTORS } from "./adapterSelectors.js"
import { endpoints } from "./apiSlice.js"
import { DRAFT_SAFE_SELECTORS } from "./draftSafeSelectors.js"
import { ENTITY_ADAPTERS } from "./entityAdapters.js"

export const resetCheckedVendorIds = (itemVendors: ItemVendors) => {
  const itemVendorsUpdate: Update<ItemVendors, number> = {
    changes: {
      checkedVendorIds: itemVendors.vendorIds,
    },
    id: itemVendors.id,
  }
  return itemVendorsUpdate
}

export const initialState: AddedState = {
  cart: ADAPTER_INITIAL_STATES.cart,
  cartItems: ADAPTER_INITIAL_STATES.cartItems,
  itemVendors: ADAPTER_INITIAL_STATES.itemVendors,
  searchResults: ADAPTER_INITIAL_STATES.searchResults,
}

export const addedSlice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(endpoints.getMain.matchFulfilled, (state, action) => {
      const { cart, items, vendors } = action.payload
      ENTITY_ADAPTERS.cart.setAll(state.cart, cart)
      ENTITY_ADAPTERS.itemVendors.setAll(
        state.itemVendors,
        items.map<ItemVendors>(({ id, vendorIds }) => ({
          checkedVendorIds: vendorIds,
          id,
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
  initialState,
  name: "added",

  reducers: {
    allItemsRemovedFromCart: (
      state,
      action: PayloadAction<{ vendorId: number }>,
    ) => {
      const { vendorId } = action.payload
      const cartUpdate: Update<Cart, number> = {
        changes: { itemIds: EMPTY_ARRAY },
        id: vendorId,
      }
      ENTITY_ADAPTERS.cart.updateOne(state.cart, cartUpdate)
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
          changes: {
            checkedVendorIds: withNumsArrayConcat(
              checkedVendorIds.concat(vendorId),
            ),
          },
          id,
        }),
      )
      ENTITY_ADAPTERS.itemVendors.updateMany(
        state.itemVendors,
        itemVendorsUpdates,
      )
    },

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
          changes: {
            itemIds: withNumsArrayConcat(itemIds.concat(itemId)),
          },
          id,
        }),
      )
      if (itemVendors) {
        // console.log(vendorIds);
        const itemVendorsUpdate: Update<ItemVendors, number> = {
          changes: {
            checkedVendorIds: itemVendors.vendorIds,
          },
          id: itemId,
        }
        ENTITY_ADAPTERS.itemVendors.updateOne(
          state.itemVendors,
          itemVendorsUpdate,
        )
      }
      ENTITY_ADAPTERS.cart.updateMany(state.cart, cartUpdates)
      ENTITY_ADAPTERS.searchResults.removeOne(state.searchResults, itemId)
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
        changes: { minimizedItemIds: EMPTY_ARRAY },
        id: vendorId,
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
        changes: { minimizedItemIds: cartItems.itemIds },
        id: vendorId,
      }
      ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, cartItemsUpdate)
    },

    searchResultsCleared: state => {
      ENTITY_ADAPTERS.searchResults.removeAll(state.searchResults)
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

    singleItemRemovedFromCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>,
    ) => {
      const { itemId, vendorId } = action.payload
      const cartItems = DRAFT_SAFE_SELECTORS.selectCartItems(state, vendorId)
      const cartUpdate: Update<Cart, number> = {
        changes: {
          itemIds: withNumsArrayFilter(cartItems.filter(id => id !== itemId)),
        },
        id: vendorId,
      }
      ENTITY_ADAPTERS.cart.updateOne(state.cart, cartUpdate)
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
        changes: {
          minimizedItemIds: toggleArrayElement(
            cartItems.minimizedItemIds,
            itemId,
          ),
        },
        id: vendorId,
      }
      ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, cartItemsUpdate)
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
        changes: {
          checkedVendorIds: toggleArrayElement(
            itemVendors.checkedVendorIds,
            vendorId,
          ),
        },
        id: itemId,
      }
      ENTITY_ADAPTERS.itemVendors.updateOne(
        state.itemVendors,
        itemVendorsUpdate,
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
          changes: {
            checkedVendorIds: withNumsArrayFilter(
              checkedVendorIds.filter(
                checkedVendorId => checkedVendorId !== vendorId,
              ),
            ),
          },
          id,
        }),
      )
      ENTITY_ADAPTERS.itemVendors.updateMany(
        state.itemVendors,
        itemVendorsUpdates,
      )
    },
  },
})

export const {
  allItemsRemovedFromCart,
  checkedOneVendorForAllSearchResults,
  itemAddedToCarts,
  maximizedAllItemsInCart,
  minimizedAllItemsInCart,
  searchResultsCleared,
  searchResultsUpdated,
  singleItemRemovedFromCart,
  toggledMinimizeOneItemInCart,
  toggledVendorForOneSearchResultItem,
  unCheckedOneVendorForAllSearchResults,
} = addedSlice.actions
