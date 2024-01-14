import type { Options } from "tinybench"
import { bench, describe } from "vitest"

import {
  checkIfAddedToAllVendors,
  checkIfAddedToVendor,
  checkIfAnyAddedToOneVendor,
  checkIfAnyItemsAdded,
  isMinimized,
  isVendorChecked,
  selectCartItemNamesStringified,
  selectCartItemsIds,
  selectCartItemsLength,
  selectCartsByItemId,
  selectCartsItemIdsLength,
  selectCategoryItemIds,
  selectCategoryName,
  selectCheckedVendorIds,
  selectItemName,
  selectItemNamesAndKeywords,
  selectItemNumber,
  selectItemSrc,
  selectOfficialVendorName,
  selectQRCodeText,
  selectVendorIdsByItemId,
  selectVendorItemIds,
} from "../../redux/selectors"
import { setupWithNoUI } from "../test-utils/testUtils"

const options: Options = {
  iterations: 5,
  time: 100,
}

describe("selectors", async () => {
  const { store } = await setupWithNoUI()
  const state = store.getState()
  bench(
    selectItemNamesAndKeywords,
    () => {
      selectItemNamesAndKeywords(state)
    },
    options,
  )
  bench(
    checkIfAnyItemsAdded,
    () => {
      checkIfAnyItemsAdded(state)
    },
    options,
  )
  bench(
    selectCartsItemIdsLength,
    () => {
      selectCartsItemIdsLength(state)
    },
    options,
  )
  bench(
    selectItemNumber,
    () => {
      selectItemNumber(state, 0)
    },
    options,
  )
  bench(
    selectItemSrc,
    () => {
      selectItemSrc(state, 0)
    },
    options,
  )
  bench(
    selectItemName,
    () => {
      selectItemName(state, 0)
    },
    options,
  )
  bench(
    selectVendorIdsByItemId,
    () => {
      selectVendorIdsByItemId(state, 0)
    },
    options,
  )
  bench(
    selectCartItemsIds,
    () => {
      selectCartItemsIds(state, 0)
    },
    options,
  )
  bench(
    selectCartItemNamesStringified,
    () => {
      selectCartItemNamesStringified(state, 0)
    },
    options,
  )
  bench(
    selectCheckedVendorIds,
    () => {
      selectCheckedVendorIds(state, 0)
    },
    options,
  )
  bench(
    isVendorChecked,
    () => {
      isVendorChecked(state, 0, 0)
    },
    options,
  )
  bench(
    isMinimized,
    () => {
      isMinimized(state, 0, 0)
    },
    options,
  )
  bench(
    selectCategoryName,
    () => {
      selectCategoryName(state, 0)
    },
    options,
  )
  bench(
    selectCategoryItemIds,
    () => {
      selectCategoryItemIds(state, 0)
    },
    options,
  )
  bench(
    checkIfAddedToVendor,
    () => {
      checkIfAddedToVendor(state, 0, 0)
    },
    options,
  )
  bench(
    selectCartItemsLength,
    () => {
      selectCartItemsLength(state, 0)
    },
    options,
  )
  bench(
    checkIfAnyAddedToOneVendor,
    () => {
      checkIfAnyAddedToOneVendor(state, 0)
    },
    options,
  )
  bench(
    selectQRCodeText,
    () => {
      selectQRCodeText(state, 0)
    },
    options,
  )
  bench(
    selectOfficialVendorName,
    () => {
      selectOfficialVendorName(state, 0)
    },
    options,
  )
  bench(
    selectVendorItemIds,
    () => {
      selectVendorItemIds(state, 0)
    },
    options,
  )
  bench(
    selectCartsByItemId,
    () => {
      selectCartsByItemId(state, 0)
    },
    options,
  )
  bench(
    checkIfAddedToAllVendors,
    () => {
      checkIfAddedToAllVendors(state, 0)
    },
    options,
  )
})
