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
import type { AddedState } from "../../types/reduxHelperTypes.js"
import type { LocalBaseTestContext } from "../test-utils/testUtils.js"
import { isNode24, setupWithNoUI } from "../test-utils/testUtils.js"

type LocalTestContext = LocalBaseTestContext & {
  initialAddedState: AddedState
}

const localTest = test.extend<LocalTestContext>({
  setupResults: [setupWithNoUI(), { auto: false }],
  initialState: [
    async ({ setupResults }, use) => {
      const { store } = await setupResults

      const initialState = store.getState()

      await use(initialState)
    },
    { auto: false },
  ],
  initialAddedState: [
    async ({ initialState }, use) => {
      const initialAddedState = initialState.added

      await use(initialAddedState)
    },
    { auto: false },
  ],
  store: [
    async ({ setupResults }, use) => {
      const { store } = await setupResults

      await use(store)
    },
    { auto: false },
  ],
})

describe("addedSlice reducers", () => {
  localTest.skipIf(isNode24)(
    itemAddedToCarts.type,
    ({ store, initialAddedState }) => {
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
    },
  )

  localTest.skipIf(isNode24)(
    toggledMinimizeOneItemInCart.type,
    ({ store, initialAddedState }) => {
      store.dispatch(toggledMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }))
      expect(store.getState().added).not.toStrictEqual(initialAddedState)
      store.dispatch(toggledMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }))
      expect(store.getState().added).toStrictEqual(initialAddedState)
    },
  )

  localTest.skipIf(isNode24)(
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

  localTest.skipIf(isNode24)(
    minimizedAllItemsInCart.type,
    ({ store, initialAddedState }) => {
      store.dispatch(minimizedAllItemsInCart({ vendorId: 0 }))
      expect(store.getState().added).not.toStrictEqual(initialAddedState)
      store.dispatch(maximizedAllItemsInCart({ vendorId: 0 }))
      expect(store.getState().added).toStrictEqual(initialAddedState)
    },
  )

  localTest.skipIf(isNode24)(
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

  localTest.skipIf(isNode24)(
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
