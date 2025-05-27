import {
  addedSlice,
  allItemsRemovedFromCart,
  checkedOneVendorForAllSearchResults,
  itemAddedToCarts,
  maximizedAllItemsInCart,
  minimizedAllItemsInCart,
  singleItemRemovedFromCart,
  toggledMinimizeOneItemInCart,
  toggledVendorForOneSearchResultItem,
  unCheckedOneVendorForAllSearchResults,
} from "../../redux/addedSlice.js"
import type { AppStore } from "../../redux/store.js"
import type { AddedState } from "../../types/reduxHelperTypes.js"
import { isNode24, setupWithNoUI } from "../test-utils/testUtils.js"

type LocalTestContext = {
  store: AppStore
  initialAddedState: AddedState
}

describe<LocalTestContext>("addedSlice reducers", it => {
  beforeEach<LocalTestContext>(async context => {
    const { store } = await setupWithNoUI()

    context.store = store

    context.initialAddedState = store.getState().added
  })

  it.skipIf(isNode24)(itemAddedToCarts.type, ({ store, initialAddedState }) => {
    expect(addedSlice.reducer(undefined, { type: "" })).toStrictEqual(
      addedSlice.getInitialState(),
    )
    store.dispatch(itemAddedToCarts({ itemId: 0 }))
    expect(store.getState().added).not.toStrictEqual(initialAddedState)
    expect(store.getState().added).not.toStrictEqual(initialAddedState)
    expect(store.getState().added).not.toStrictEqual(initialAddedState)
    store.dispatch(singleItemRemovedFromCart({ itemId: 0, vendorId: 0 }))
    expect(store.getState().added).not.toStrictEqual(initialAddedState)
    store.dispatch(singleItemRemovedFromCart({ itemId: 0, vendorId: 1 }))
    expect(store.getState().added).toStrictEqual(initialAddedState)
  })

  it.skipIf(isNode24)(
    toggledMinimizeOneItemInCart.type,
    ({ store, initialAddedState }) => {
      store.dispatch(toggledMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }))
      expect(store.getState().added).not.toStrictEqual(initialAddedState)
      store.dispatch(toggledMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }))
      expect(store.getState().added).toStrictEqual(initialAddedState)
    },
  )

  it.skipIf(isNode24)(
    checkedOneVendorForAllSearchResults.type,
    ({ store, initialAddedState }) => {
      store.dispatch(checkedOneVendorForAllSearchResults({ vendorId: 0 }))
      expect(store.getState().added).toStrictEqual(initialAddedState)
      store.dispatch(unCheckedOneVendorForAllSearchResults({ vendorId: 0 }))
      expect(store.getState().added).not.toStrictEqual(initialAddedState)
      store.dispatch(checkedOneVendorForAllSearchResults({ vendorId: 0 }))
      expect(store.getState().added).toStrictEqual(initialAddedState)
      expect(store.getState().added).toStrictEqual(initialAddedState)
      expect(store.getState().added).toStrictEqual(initialAddedState)
    },
  )

  it.skipIf(isNode24)(
    minimizedAllItemsInCart.type,
    ({ store, initialAddedState }) => {
      store.dispatch(minimizedAllItemsInCart({ vendorId: 0 }))
      expect(store.getState().added).not.toStrictEqual(initialAddedState)
      store.dispatch(maximizedAllItemsInCart({ vendorId: 0 }))
      expect(store.getState().added).toStrictEqual(initialAddedState)
    },
  )

  it.skipIf(isNode24)(
    toggledVendorForOneSearchResultItem.type,
    ({ store, initialAddedState }) => {
      store.dispatch(
        toggledVendorForOneSearchResultItem({ itemId: 0, vendorId: 0 }),
      )
      expect(store.getState().added).not.toStrictEqual(initialAddedState)
      store.dispatch(
        toggledVendorForOneSearchResultItem({ itemId: 0, vendorId: 0 }),
      )
      expect(store.getState().added).toStrictEqual(initialAddedState)
    },
  )

  it.skipIf(isNode24)(
    allItemsRemovedFromCart.type,
    ({ store, initialAddedState }) => {
      store.dispatch(itemAddedToCarts({ itemId: 0 }))
      store.dispatch(itemAddedToCarts({ itemId: 1 }))
      store.dispatch(allItemsRemovedFromCart({ vendorId: 0 }))
      expect(store.getState().added).not.toStrictEqual(initialAddedState)
      store.dispatch(allItemsRemovedFromCart({ vendorId: 1 }))
      expect(store.getState().added).toStrictEqual(initialAddedState)
    },
  )
})
