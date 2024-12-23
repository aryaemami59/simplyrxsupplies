import {
  selectCategoriesData,
  selectItemsData,
  selectMainData,
  selectVendorsData,
} from "../../redux/apiSlice.js"
import type { AppStore } from "../../redux/store.js"
import type { SuppliesState } from "../../types/reduxHelperTypes.js"
import { EMPTY_ARRAY } from "../../utils/emptyArray.js"
import { setupWithNoUI } from "../test-utils/testUtils.js"

type LocalTestContext = {
  data: SuppliesState | undefined
  store: AppStore
}

describe<LocalTestContext>("apiSlice with fetch", it => {
  beforeEach<LocalTestContext>(async context => {
    const { store } = await setupWithNoUI()

    const data = selectMainData(store.getState())

    context.data = data

    context.store = store
  })

  it("RTK query api call should be successful", ({ data }) => {
    expect(data).toBeDefined()
    expect(data?.cart[0]?.itemIds).toBe(EMPTY_ARRAY)
    expect(data?.items).not.toBe(EMPTY_ARRAY)
  })
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
