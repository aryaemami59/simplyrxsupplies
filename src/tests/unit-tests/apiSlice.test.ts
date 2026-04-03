import {
  selectCategoriesData,
  selectItemsData,
  selectMainData,
  selectVendorsData,
} from "../../redux/apiSlice.js"
import type { SuppliesState } from "../../types/reduxHelperTypes.js"
import type { Simplify } from "../../types/tsHelpers.js"
import { EMPTY_ARRAY } from "../../utils/emptyArray.js"
import type { LocalBaseTestContext } from "../test-utils/testUtils.js"
import { setupWithNoUI } from "../test-utils/testUtils.js"

type LocalTestContext = Simplify<
  LocalBaseTestContext & {
    data: SuppliesState | undefined
  }
>

const localTest = test.extend<LocalTestContext>({
  data: [
    async ({ store }, use) => {
      const data = selectMainData(store.getState())

      await use(data)

      selectMainData.clearCache()
      selectMainData.resetDependencyRecomputations()
      selectMainData.resetRecomputations()
      selectMainData.resetResultsCount()
      selectMainData.memoizedResultFunc.clearCache()
      selectMainData.memoizedResultFunc.resetResultsCount()
    },
    { auto: false },
  ],
  initialState: [
    async ({ store }, use) => {
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

describe("apiSlice with fetch", () => {
  localTest("RTK query api call should be successful", ({ data }) => {
    // TODO: Change this to `expect.assert.isDefined(data)`.
    expect.assert(data)
    expect(data.cart[0]?.itemIds).toBe(EMPTY_ARRAY)
    expect(data.items).not.toBe(EMPTY_ARRAY)
  })
})

describe("apiSlice without fetch", () => {
  localTest.override({ setupResults: setupWithNoUI({ fetch: false }) })

  localTest("rtk query api call should fail", ({ data, store }) => {
    const state = store.getState()
    expect(data).toBeUndefined()
    expect(selectItemsData(state).ids).toBeEmptyArray()
    expect(selectVendorsData(state).ids).toBeEmptyArray()
    expect(selectCategoriesData(state).ids).toBeEmptyArray()
  })
})
