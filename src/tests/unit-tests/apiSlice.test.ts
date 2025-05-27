import {
  selectCategoriesData,
  selectItemsData,
  selectMainData,
  selectVendorsData,
} from "../../redux/apiSlice.js"
import type { AppStore } from "../../redux/store.js"
import type { SuppliesState } from "../../types/reduxHelperTypes.js"
import { EMPTY_ARRAY } from "../../utils/emptyArray.js"
import type { SetupWithNoUIResults } from "../test-utils/testUtils.js"
import { isNode24, setupWithNoUI } from "../test-utils/testUtils.js"

type LocalTestContext = {
  setupResults: Promise<SetupWithNoUIResults>
  data: SuppliesState | undefined
  store: AppStore
}

const localTest = test.extend<LocalTestContext>({
  setupResults: [setupWithNoUI(), { auto: false }],
  store: [
    async ({ setupResults }, use) => {
      const { store } = await setupResults

      await use(store)
    },
    { auto: false },
  ],

  data: [
    async ({ store }, use) => {
      const data = selectMainData(store.getState())

      await use(data)
    },
    { auto: false },
  ],
})

describe("apiSlice with fetch", () => {
  localTest.skipIf(isNode24)(
    "RTK query api call should be successful",
    ({ data }) => {
      expect(data).toBeDefined()
      expect(data?.cart[0]?.itemIds).toBe(EMPTY_ARRAY)
      expect(data?.items).not.toBe(EMPTY_ARRAY)
    },
  )
})

describe<LocalTestContext>("apiSlice without fetch", it => {
  beforeEach<LocalTestContext>(async context => {
    const { store } = await setupWithNoUI({ fetch: false })
    const data = selectMainData(store.getState())
    context.data = data
    context.store = store
  })

  it("rtk query api call should fail", ({ data, store }) => {
    const state = store.getState()
    expect(data).toBeUndefined()
    expect(selectItemsData(state).ids).toBeEmptyArray()
    expect(selectVendorsData(state).ids).toBeEmptyArray()
    expect(selectCategoriesData(state).ids).toBeEmptyArray()
  })
})
