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
import type { Simplify } from "../../types/tsHelpers.js"
import type { LocalBaseTestContext } from "../test-utils/testUtils.js"
import { setupWithNoUI } from "../test-utils/testUtils.js"

type LocalTestContext = Simplify<
  LocalBaseTestContext & {
    initialAddedState: AddedState
  }
>

const localTest = test.extend<LocalTestContext>({
  initialAddedState: [
    async ({ initialState }, use) => {
      const initialAddedState = initialState.added

      await use(initialAddedState)
    },
    { auto: false },
  ],
  initialState: [
    async ({ setupResults }, use) => {
      const { store } = await setupResults

      const initialState = store.getState()

      await use(initialState)
    },
    { auto: false },
  ],
  setupResults: [setupWithNoUI(), { auto: false }],
  store: [
    async ({ setupResults }, use) => {
      const { store } = await setupResults

      await use(store)
    },
    { auto: false },
  ],
})

describe("addedSlice reducers", () => {
  localTest(itemAddedToCarts.type, ({ initialAddedState, store }) => {
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

  localTest(
    toggledMinimizeOneItemInCart.type,
    ({ initialAddedState, store }) => {
      store.dispatch(toggledMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }))
      expect(store.getState().added).not.toStrictEqual(initialAddedState)
      store.dispatch(toggledMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }))
      expect(store.getState().added).toStrictEqual(initialAddedState)
    },
  )

  localTest(
    checkedOneVendorForAllSearchResults.type,
    ({ initialAddedState, store }) => {
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

  localTest(minimizedAllItemsInCart.type, ({ initialAddedState, store }) => {
    store.dispatch(minimizedAllItemsInCart({ vendorId: 0 }))
    expect(store.getState().added).not.toStrictEqual(initialAddedState)
    store.dispatch(maximizedAllItemsInCart({ vendorId: 0 }))
    expect(store.getState().added).toStrictEqual(initialAddedState)
  })

  localTest(
    toggledVendorForOneSearchResultItem.type,
    ({ initialAddedState, store }) => {
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

  localTest(allItemsRemovedFromCart.type, ({ initialAddedState, store }) => {
    store.dispatch(itemAddedToCarts({ itemId: 0 }))
    store.dispatch(itemAddedToCarts({ itemId: 1 }))
    store.dispatch(allItemsRemovedFromCart({ vendorId: 0 }))
    expect(store.getState().added).not.toStrictEqual(initialAddedState)
    store.dispatch(allItemsRemovedFromCart({ vendorId: 1 }))
    expect(store.getState().added).toStrictEqual(initialAddedState)
  })
})
