import { beforeEach, describe, expect } from "vitest";

import {
  selectCartItemsIds,
  selectCartsByItemId,
  selectCategoryItemIds,
  selectCheckedVendorIds,
  selectItemNamesAndKeywords,
  selectVendorIdsByItemId,
  selectVendorItemIds,
} from "../../redux/selectors";
import { setupWithNoUI } from "../test-utils/testUtils";

type LocalTestContext = Awaited<ReturnType<typeof setupWithNoUI>>;

describe<LocalTestContext>("selectors", it => {
  beforeEach<LocalTestContext>(async context => {
    const { store, initialState } = await setupWithNoUI();
    context.store = store;
    context.initialState = initialState;
  });

  it("selectItemNamesAndKeywords", ({ initialState }) => {
    expect(selectItemNamesAndKeywords.recomputations()).toBe(0);
    const first = selectItemNamesAndKeywords(initialState);
    const second = selectItemNamesAndKeywords(initialState);
    selectItemNamesAndKeywords(initialState);
    selectItemNamesAndKeywords(initialState);
    expect(first).toBe(second);
    expect(selectItemNamesAndKeywords.recomputations()).toBe(1);
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
  });

  it("selectCartsByItemId", ({ initialState }) => {
    expect(selectCartsByItemId.recomputations()).toBe(0);
    const first = selectCartsByItemId(initialState, 0);
    const second = selectCartsByItemId(initialState, 0);
    selectCartsByItemId(initialState, 0);
    selectCartsByItemId(initialState, 0);
    expect(first).toBe(second);
    expect(selectCartsByItemId.recomputations()).toBe(1);
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
  });
});
