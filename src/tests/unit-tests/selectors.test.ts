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
} from "../../redux/selectors.js"
import type { SetupWithNoUIResults } from "../test-utils/testUtils.js"
import { isNode24, setupWithNoUI } from "../test-utils/testUtils.js"

type LocalTestContext = SetupWithNoUIResults

const { store, initialState } = await setupWithNoUI()

const localTest = test.extend<LocalTestContext>({ initialState, store })

describe("selectors", () => {
  localTest("selectItemNamesAndKeywords", ({ initialState }) => {
    expect(selectItemNamesAndKeywords.recomputations()).toBe(0)
    const first = selectItemNamesAndKeywords(initialState)
    const second = selectItemNamesAndKeywords(initialState)
    selectItemNamesAndKeywords(initialState)
    selectItemNamesAndKeywords(initialState)
    expect(first).toBe(second)
    expect(selectItemNamesAndKeywords.recomputations()).toBe(1)
    selectItemNamesAndKeywords.clearCache()
  })

  localTest("selectCartItemsIds", ({ initialState }) => {
    expect(selectCartItemsIds.recomputations()).toBe(0)
    const first = selectCartItemsIds(initialState, 0)
    const second = selectCartItemsIds(initialState, 0)
    selectCartItemsIds(initialState, 0)
    selectCartItemsIds(initialState, 0)
    expect(first).toBe(second)
    expect(first).toBeEmptyArray()
    expect(selectCartItemsIds.recomputations()).toBe(1)
    selectCartItemsIds.clearCache()
  })

  localTest.skipIf(isNode24)("selectCheckedVendorIds", ({ initialState }) => {
    expect(selectCheckedVendorIds.recomputations()).toBe(0)
    const first = selectCheckedVendorIds(initialState, 0)
    const second = selectCheckedVendorIds(initialState, 0)
    selectCheckedVendorIds(initialState, 0)
    selectCheckedVendorIds(initialState, 0)
    expect(first).toBe(second)
    expect(first).not.toBeEmptyArray()
    expect(selectCheckedVendorIds.recomputations()).toBe(1)
    selectCheckedVendorIds.clearCache()
  })

  localTest("selectCategoryItemIds", () => {
    expect(selectCategoryItemIds.recomputations()).toBe(0)
    // const { store, initialState } = await setupWithNoUI()
    // const state = store.getState()
    // const stateDeepCopy = structuredClone(state)
    // const stateShallowCopy = { ...state }
    // // console.log(state.added.cartItems.ids)
    // const first = selectCategoryItemIds(initialState, 0);
    // const second = selectCategoryItemIds(initialState, 0);
    // selectCategoryItemIds(initialState, 0);
    // selectCategoryItemIds(initialState, 0);
    // expect(first).toBe(second);
    // expect(first).not.toBeEmptyArray();
    // expect(selectCategoryItemIds.recomputations()).toBe(1);
    // selectCategoryItemIds1(state, 0)
    // selectCategoryItemIds1(state, 0)
    // selectCategoryItemIds1(state, 1)
    // selectCategoryItemIds1(state, 0)
    // selectCategoryItemIds1({ ...state }, 0)
    // selectCategoryItemIds1(state, 0)
    // selectCategoryItemIds1({ ...state }, 1)
    // selectCategoryItemIds2(state, 1)
    // selectCategoryItemIds({ ...state }, 0)
    // selectCategoryItemIds(stateCopy, 0)
    // console.log(state.added === { ...state }.added)
    // selectCategoryItemIds1({ ...state }, 0)
    // selectCategoryItemIds1(state, 0)
    // selectCategoryItemIds1(state, 1)
    // const start = performance.now()
    // for (let i = 0; i < 1_000_000; i += 1) {
    // selectCategoryItemIds1(state, 0)
    // selectCategoryItemIds1(stateShallowCopy, 0)
    // selectCategoryItemIds1(stateDeepCopy, 0)
    // const stateShallowCopy = { ...state }
    // selectCategoryItemIds(state, 0)
    // selectCategoryItemIds(stateCopy, 0)
    // selectCategoryItemIds(stateShallowCopy, 0)
    // selectCategoryItemIds1(state, 0)
    // }
    // for (let i = 0; i < 1_000_000; i += 1) {
    //   // selectCategoryItemIds(stateCopy, 1)
    //   // selectCategoryItemIds1(state, 1)
    // }
    // const total = performance.now() - start
    // expect.soft(total).toBeLessThan(1000)
    // console.log(selectCategoryItemIds.lastResult())
    // console.log(total)
    // console.log(selectCategoryItemIds1.recomputations())
    // selectCategoryItemIds.clearCache();
  })

  localTest.skipIf(isNode24)("selectVendorItemIds", ({ initialState }) => {
    expect(selectVendorItemIds.recomputations()).toBe(0)
    const first = selectVendorItemIds(initialState, 0)
    const second = selectVendorItemIds(initialState, 0)
    selectVendorItemIds(initialState, 0)
    selectVendorItemIds(initialState, 0)
    expect(first).toBe(second)
    expect(first).not.toBeEmptyArray()
    expect(selectVendorItemIds.recomputations()).toBe(1)
    selectVendorItemIds.clearCache()
  })

  localTest.skipIf(isNode24)("selectVendorIdsByItemId", ({ initialState }) => {
    expect(selectVendorIdsByItemId.recomputations()).toBe(0)
    const first = selectVendorIdsByItemId(initialState, 0)
    const second = selectVendorIdsByItemId(initialState, 0)
    selectVendorIdsByItemId(initialState, 0)
    selectVendorIdsByItemId(initialState, 0)
    expect(first).toBe(second)
    expect(first).not.toBeEmptyArray()
    expect(selectVendorIdsByItemId.recomputations()).toBe(1)
    selectVendorIdsByItemId.clearCache()
  })

  localTest("checkIfAnyItemsAdded", ({ initialState }) => {
    expect(checkIfAnyItemsAdded.recomputations()).toBe(0)
    const first = checkIfAnyItemsAdded(initialState)
    const second = checkIfAnyItemsAdded(initialState)
    checkIfAnyItemsAdded(initialState)
    checkIfAnyItemsAdded(initialState)
    expect(first).toBe(second)
    expect(first).toBeFalse()
    expect(checkIfAnyItemsAdded.recomputations()).toBe(1)
    checkIfAnyItemsAdded.clearCache()
  })

  localTest("selectCartItemNamesStringified", ({ initialState }) => {
    expect(selectCartItemNamesStringified.recomputations()).toBe(0)
    const first = selectCartItemNamesStringified(initialState, 0)
    const second = selectCartItemNamesStringified(initialState, 0)
    selectCartItemNamesStringified(initialState, 0)
    selectCartItemNamesStringified(initialState, 0)
    expect(first).toBe(second)
    expect(first).toBe("")
    expect(selectCartItemNamesStringified.recomputations()).toBe(1)
    selectCartItemNamesStringified.clearCache()
  })

  localTest("selectQRCodeText", ({ initialState }) => {
    expect(selectQRCodeText.recomputations()).toBe(0)
    const first = selectQRCodeText(initialState, 0)
    const second = selectQRCodeText(initialState, 0)
    selectQRCodeText(initialState, 0)
    selectQRCodeText(initialState, 0)
    expect(first).toBe(second)
    expect(first).toBe("")
    expect(selectQRCodeText.recomputations()).toBe(1)
    selectQRCodeText.clearCache()
  })

  localTest("all selectors", ({ initialState }) => {
    selectItemNamesAndKeywords(initialState)
    checkIfAnyItemsAdded(initialState)
    selectCartsItemIdsLength(initialState)
    selectItemNumber(initialState, 0)
    selectItemSrc(initialState, 0)
    selectItemName(initialState, 0)
    selectVendorIdsByItemId(initialState, 0)
    selectCartItemsIds(initialState, 0)
    selectCartItemNamesStringified(initialState, 0)
    selectCheckedVendorIds(initialState, 0)
    isVendorChecked(initialState, 0, 0)
    isMinimized(initialState, 0, 0)
    selectCategoryName(initialState, 0)
    selectCategoryItemIds(initialState, 0)
    checkIfAddedToVendor(initialState, 0, 0)
    selectCartItemsLength(initialState, 0)
    checkIfAnyAddedToOneVendor(initialState, 0)
    selectQRCodeText(initialState, 0)
    selectOfficialVendorName(initialState, 0)
    selectVendorItemIds(initialState, 0)
    selectCartsByItemId(initialState, 0)
    checkIfAddedToAllVendors(initialState, 0)
  })
})
