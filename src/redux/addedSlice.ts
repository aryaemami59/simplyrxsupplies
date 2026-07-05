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

/**
 * Builds an entity-adapter {@linkcode Update} that resets an item-vendor
 * record's `checkedVendorIds` to its full list of `vendorIds`, marking every
 * vendor of the item as checked.
 *
 * @param itemVendors - The {@linkcode ItemVendors} record whose checked vendors are reset.
 * @returns An {@linkcode Update} for the {@linkcode ItemVendors} entity.
 */
export const resetCheckedVendorIds = (itemVendors: ItemVendors) => {
  const itemVendorsUpdate = {
    changes: {
      checkedVendorIds: itemVendors.vendorIds,
    },
    id: itemVendors.id,
  } as const satisfies Update<ItemVendors, number>

  return itemVendorsUpdate
}

/**
 * The initial {@linkcode AddedState} for the {@linkcode addedSlice} reducer,
 * seeded from {@linkcode ADAPTER_INITIAL_STATES}.
 */
export const initialState = {
  cart: ADAPTER_INITIAL_STATES.cart,
  cartItems: ADAPTER_INITIAL_STATES.cartItems,
  itemVendors: ADAPTER_INITIAL_STATES.itemVendors,
  searchResults: ADAPTER_INITIAL_STATES.searchResults,
} as const satisfies AddedState

/**
 * Redux Toolkit slice that owns the "added" state - the cart, cart items,
 * item-vendor selections, and search results. Its reducers handle every cart
 * and search-result mutation, while an extra reducer seeds the entities from
 * the fulfilled {@linkcode endpoints.getMain | getMain} query.
 */
export const addedSlice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(endpoints.getMain.matchFulfilled, (state, action) => {
      const { cart, items, vendors } = action.payload
      ENTITY_ADAPTERS.cart.setAll(state.cart, cart)
      ENTITY_ADAPTERS.itemVendors.setAll(
        state.itemVendors,
        items.map(
          ({ id, vendorIds }) =>
            ({
              checkedVendorIds: vendorIds,
              id,
              vendorIds,
            }) as const satisfies ItemVendors,
        ),
      )

      ENTITY_ADAPTERS.cartItems.setAll(
        state.cartItems,
        vendors.map(
          ({ id, itemIds }) =>
            ({
              id,
              itemIds,
              minimizedItemIds: EMPTY_ARRAY,
            }) as const satisfies CartItems,
        ),
      )
    })
  },
  initialState,
  name: "added",

  reducers: {
    /**
     * Removes every item from the given vendor's cart by resetting its item
     * list to {@linkcode EMPTY_ARRAY}.
     */
    allItemsRemovedFromCart: (
      state,
      action: PayloadAction<{ vendorId: number }>,
    ) => {
      const { vendorId } = action.payload

      const cartUpdate = {
        changes: { itemIds: EMPTY_ARRAY },
        id: vendorId,
      } as const satisfies Update<Cart, number>

      ENTITY_ADAPTERS.cart.updateOne(state.cart, cartUpdate)
    },

    /**
     * Marks the given vendor as checked on every search-result item that does
     * not already have it checked.
     */
    checkedOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>,
    ) => {
      const { vendorId } = action.payload

      const itemVendors = DRAFT_SAFE_SELECTORS.selectUnCheckedItemVendors(
        state,
        vendorId,
      )

      const itemVendorsUpdates = itemVendors.map(
        ({ checkedVendorIds, id }) =>
          ({
            changes: {
              checkedVendorIds: withNumsArrayConcat(
                checkedVendorIds.concat(vendorId),
              ),
            },
            id,
          }) as const satisfies Update<ItemVendors, number>,
      )

      ENTITY_ADAPTERS.itemVendors.updateMany(
        state.itemVendors,
        itemVendorsUpdates,
      )
    },

    /**
     * Adds the given item to the carts of all its currently checked vendors,
     * syncs the item's checked vendors, and removes it from the search
     * results.
     */
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

      const cartUpdates = carts.map(
        ({ id, itemIds }) =>
          ({
            changes: {
              itemIds: withNumsArrayConcat(itemIds.concat(itemId)),
            },
            id,
          }) as const satisfies Update<Cart, number>,
      )

      if (itemVendors) {
        const itemVendorsUpdate = {
          changes: {
            checkedVendorIds: itemVendors.vendorIds,
          },
          id: itemId,
        } as const satisfies Update<ItemVendors, number>

        ENTITY_ADAPTERS.itemVendors.updateOne(
          state.itemVendors,
          itemVendorsUpdate,
        )
      }

      ENTITY_ADAPTERS.cart.updateMany(state.cart, cartUpdates)

      ENTITY_ADAPTERS.searchResults.removeOne(state.searchResults, itemId)
    },

    /**
     * Expands all items in the given vendor's cart by clearing its list of
     * minimized item IDs.
     */
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

      const cartItemsUpdate = {
        changes: { minimizedItemIds: EMPTY_ARRAY },
        id: vendorId,
      } as const satisfies Update<CartItems, number>

      ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, cartItemsUpdate)
    },

    /**
     * Minimizes every item in the given vendor's cart by copying its item IDs
     * into the minimized-items list.
     */
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

      const cartItemsUpdate = {
        changes: { minimizedItemIds: cartItems.itemIds },
        id: vendorId,
      } as const satisfies Update<CartItems, number>

      ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, cartItemsUpdate)
    },

    /**
     * Removes all items from the search results.
     */
    searchResultsCleared: state => {
      ENTITY_ADAPTERS.searchResults.removeAll(state.searchResults)
    },

    /**
     * Replaces the search results with items built from the payload array of
     * item IDs.
     */
    searchResultsUpdated: (state, action: PayloadAction<number[]>) => {
      const { payload: itemIds } = action

      const newSearchResults = itemIds.map(
        id =>
          ({
            id,
          }) as const satisfies SearchResultsItem,
      )

      ENTITY_ADAPTERS.searchResults.setAll(
        state.searchResults,
        newSearchResults,
      )
    },

    /**
     * Removes a single item from the given vendor's cart.
     */
    singleItemRemovedFromCart: (
      state,
      action: PayloadAction<ItemIdAndVendorId>,
    ) => {
      const { itemId, vendorId } = action.payload

      const cartItems = DRAFT_SAFE_SELECTORS.selectCartItems(state, vendorId)

      const cartUpdate = {
        changes: {
          itemIds: withNumsArrayFilter(cartItems.filter(id => id !== itemId)),
        },
        id: vendorId,
      } as const satisfies Update<Cart, number>

      ENTITY_ADAPTERS.cart.updateOne(state.cart, cartUpdate)
    },

    /**
     * Toggles whether a single item is minimized within the given vendor's
     * cart.
     */
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

      const cartItemsUpdate = {
        changes: {
          minimizedItemIds: toggleArrayElement(
            cartItems.minimizedItemIds,
            itemId,
          ),
        },
        id: vendorId,
      } as const satisfies Update<CartItems, number>

      ENTITY_ADAPTERS.cartItems.updateOne(state.cartItems, cartItemsUpdate)
    },

    /**
     * Toggles whether the given vendor is checked for a single search-result
     * item.
     */
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

      const itemVendorsUpdate = {
        changes: {
          checkedVendorIds: toggleArrayElement(
            itemVendors.checkedVendorIds,
            vendorId,
          ),
        },
        id: itemId,
      } as const satisfies Update<ItemVendors, number>

      ENTITY_ADAPTERS.itemVendors.updateOne(
        state.itemVendors,
        itemVendorsUpdate,
      )
    },

    /**
     * Un-checks the given vendor on every search-result item that currently
     * has it checked.
     */
    unCheckedOneVendorForAllSearchResults: (
      state,
      action: PayloadAction<{ vendorId: number }>,
    ) => {
      const { vendorId } = action.payload

      const itemVendors = DRAFT_SAFE_SELECTORS.selectItemVendorsByVendorId(
        state,
        vendorId,
      )

      const itemVendorsUpdates = itemVendors.map(
        ({ checkedVendorIds, id }) =>
          ({
            changes: {
              checkedVendorIds: withNumsArrayFilter(
                checkedVendorIds.filter(
                  checkedVendorId => checkedVendorId !== vendorId,
                ),
              ),
            },
            id,
          }) as const satisfies Update<ItemVendors, number>,
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
