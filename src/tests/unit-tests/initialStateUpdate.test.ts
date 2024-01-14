import { shallowEqual } from "react-redux"
import { beforeEach, describe, expect } from "vitest"

import { ADAPTER_SELECTORS } from "../../redux/adapterSelectors"
import { selectItemName, selectOfficialVendorName } from "../../redux/selectors"
import type { CartItems, ItemVendors } from "../../types/reduxHelperTypes"
import EMPTY_ARRAY from "../../utils/emptyArray"
import isArrayOfNumbers from "../../utils/predicates/isArrayOfNumbers"
import isNumber from "../../utils/predicates/isNumber"
import type { SetupWithNoUIResults } from "../test-utils/testUtils"
import { setupWithNoUI } from "../test-utils/testUtils"

type LocalTestContext = SetupWithNoUIResults

describe<LocalTestContext>("initial state after fetch", it => {
  beforeEach<LocalTestContext>(async context => {
    const { store, initialState } = await setupWithNoUI()
    context.store = store
    context.initialState = initialState
  })

  it("should hydrate the store", ({ store, initialState }) => {
    const addedState = store.getState().added
    const state = store.getState()
    expect(
      ADAPTER_SELECTORS.GLOBAL.itemVendors.selectIds(state),
    ).toBeArrayOfSize(367)
    expect(addedState.cart.ids).toBeArrayOfSize(8)
    expect(addedState.cartItems.ids).toBeArrayOfSize(8)
    expect(addedState.searchResults.ids).toBeEmptyArray()
    expect(addedState.cart.ids).toContainEqual(1)
    expect(
      ADAPTER_SELECTORS.GLOBAL.itemVendors.selectAll(state),
    ).toSatisfyAll<ItemVendors>(
      ({ vendorIds, checkedVendorIds, id }) =>
        Object.is(checkedVendorIds, vendorIds) &&
        shallowEqual(checkedVendorIds, vendorIds) &&
        isNumber(id),
    )
    expect(
      ADAPTER_SELECTORS.GLOBAL.cartItems.selectAll(state),
    ).toSatisfyAll<CartItems>(
      ({ id, itemIds, minimizedItemIds }) =>
        isArrayOfNumbers(itemIds) &&
        Object.is(minimizedItemIds, EMPTY_ARRAY) &&
        isNumber(id),
    )
  })
})

describe<LocalTestContext>("initial state before fetch", it => {
  beforeEach<LocalTestContext>(async context => {
    const { store, initialState } = await setupWithNoUI({
      fetch: false,
    })
    context.store = store
    context.initialState = initialState
  })

  it("should not hydrate the store", ({ store, initialState }) => {
    const addedState = store.getState().added
    expect(addedState.itemVendors.ids).toBeEmptyArray()
    expect(addedState.cart.ids).toBeEmptyArray()
    expect(addedState.cartItems.ids).toBeEmptyArray()
    expect(addedState.searchResults.ids).toBeEmptyArray()
    expect(selectItemName(store.getState(), 0)).toBe("")
    expect(selectOfficialVendorName(store.getState(), 0)).toBe("GNFR")
  })
})
