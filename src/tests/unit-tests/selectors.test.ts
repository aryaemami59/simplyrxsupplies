import { beforeEach, describe, expect } from "vitest";

import selectors, {
  checkIfAnyItemsAdded,
  selectCartItemNamesStringified,
  selectCartItemsIds,
  selectCategoryItemIds,
  selectCheckedVendorIds,
  selectItemNamesAndKeywords,
  selectQRCodeText,
  selectVendorIdsByItemId,
  selectVendorItemIds,
} from "../../redux/selectors";
import type { SetupWithNoUIResults } from "../test-utils/testUtils";
import { setupWithNoUI } from "../test-utils/testUtils";

type LocalTestContext = SetupWithNoUIResults;

describe<LocalTestContext>("selectors", it => {
  beforeEach<LocalTestContext>(async context => {
    const { store, initialState } = await setupWithNoUI();
    context.store = store;
    context.initialState = initialState;
  });

  it("selectItemNamesAndKeywords", ({ initialState }) => {
    expect(
      Object.values(selectors).map(e => e.recomputations())
    ).toSatisfyAll<number>(e => e === 0);
    expect(selectItemNamesAndKeywords.recomputations()).toBe(0);
    const first = selectItemNamesAndKeywords(initialState);
    const second = selectItemNamesAndKeywords(initialState);
    selectItemNamesAndKeywords(initialState);
    selectItemNamesAndKeywords(initialState);
    expect(first).toBe(second);
    expect(selectItemNamesAndKeywords.recomputations()).toBe(1);
    selectItemNamesAndKeywords.clearCache();
  });

  it("selectCartItemsIds", ({ initialState }) => {
    expect(selectCartItemsIds.recomputations()).toBe(0);
    const first = selectCartItemsIds(initialState, 0);
    const second = selectCartItemsIds(initialState, 0);
    selectCartItemsIds(initialState, 0);
    selectCartItemsIds(initialState, 0);
    expect(first).toBe(second);
    expect(first).toBeEmptyArray();
    expect(selectCartItemsIds.recomputations()).toBe(1);
    selectCartItemsIds.clearCache();
  });

  it("selectCheckedVendorIds", ({ initialState }) => {
    expect(selectCheckedVendorIds.recomputations()).toBe(0);
    const first = selectCheckedVendorIds(initialState, 0);
    const second = selectCheckedVendorIds(initialState, 0);
    selectCheckedVendorIds(initialState, 0);
    selectCheckedVendorIds(initialState, 0);
    expect(first).toBe(second);
    expect(first).not.toBeEmptyArray();
    expect(selectCheckedVendorIds.recomputations()).toBe(1);
    selectCheckedVendorIds.clearCache();
  });

  it("selectCategoryItemIds", ({ initialState }) => {
    expect(selectCategoryItemIds.recomputations()).toBe(0);
    const first = selectCategoryItemIds(initialState, 0);
    const second = selectCategoryItemIds(initialState, 0);
    selectCategoryItemIds(initialState, 0);
    selectCategoryItemIds(initialState, 0);
    expect(first).toBe(second);
    expect(first).not.toBeEmptyArray();
    expect(selectCategoryItemIds.recomputations()).toBe(1);
    selectCategoryItemIds.clearCache();
  });

  it("selectVendorItemIds", ({ initialState }) => {
    expect(selectVendorItemIds.recomputations()).toBe(0);
    const first = selectVendorItemIds(initialState, 0);
    const second = selectVendorItemIds(initialState, 0);
    selectVendorItemIds(initialState, 0);
    selectVendorItemIds(initialState, 0);
    expect(first).toBe(second);
    expect(first).not.toBeEmptyArray();
    expect(selectVendorItemIds.recomputations()).toBe(1);
    selectVendorItemIds.clearCache();
  });

  it("selectVendorIdsByItemId", ({ initialState }) => {
    expect(selectVendorIdsByItemId.recomputations()).toBe(0);
    const first = selectVendorIdsByItemId(initialState, 0);
    const second = selectVendorIdsByItemId(initialState, 0);
    selectVendorIdsByItemId(initialState, 0);
    selectVendorIdsByItemId(initialState, 0);
    expect(first).toBe(second);
    expect(first).not.toBeEmptyArray();
    expect(selectVendorIdsByItemId.recomputations()).toBe(1);
    selectVendorIdsByItemId.clearCache();
  });

  it("checkIfAnyItemsAdded", ({ initialState }) => {
    expect(checkIfAnyItemsAdded.recomputations()).toBe(0);
    const first = checkIfAnyItemsAdded(initialState);
    const second = checkIfAnyItemsAdded(initialState);
    checkIfAnyItemsAdded(initialState);
    checkIfAnyItemsAdded(initialState);
    expect(first).toBe(second);
    expect(first).toBeFalse();
    expect(checkIfAnyItemsAdded.recomputations()).toBe(1);
    checkIfAnyItemsAdded.clearCache();
  });

  it("selectCartItemNamesStringified", ({ initialState }) => {
    expect(selectCartItemNamesStringified.recomputations()).toBe(0);
    const first = selectCartItemNamesStringified(initialState, 0);
    const second = selectCartItemNamesStringified(initialState, 0);
    selectCartItemNamesStringified(initialState, 0);
    selectCartItemNamesStringified(initialState, 0);
    expect(first).toBe(second);
    expect(first).toBe("");
    expect(selectCartItemNamesStringified.recomputations()).toBe(1);
    selectCartItemNamesStringified.clearCache();
  });

  it("selectQRCodeText", ({ initialState }) => {
    expect(selectQRCodeText.recomputations()).toBe(0);
    const first = selectQRCodeText(initialState, 0);
    const second = selectQRCodeText(initialState, 0);
    selectQRCodeText(initialState, 0);
    selectQRCodeText(initialState, 0);
    expect(first).toBe(second);
    expect(first).toBe("");
    expect(selectQRCodeText.recomputations()).toBe(1);
    selectQRCodeText.clearCache();
  });
});
