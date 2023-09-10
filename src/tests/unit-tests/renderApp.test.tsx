import { beforeEach, describe, expect } from "vitest";

import App from "../../App";
import { ADAPTER_SELECTORS } from "../../redux/adapterSelectors";
import { selectVendorsData } from "../../redux/apiSlice";
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
  selectCategoryItemIds,
  selectCategoryName,
  selectCheckedVendorIds,
  selectItemName,
  selectItemNamesAndKeywords,
  selectItemNumber,
  selectItemSrc,
  selectOfficialName,
  selectQRCodeText,
  selectVendorIdsByItemId,
  selectVendorItemIds,
  selectVendorsLinks,
} from "../../redux/selectors";
import type { ExtendedRenderResult } from "../test-utils/testUtils";
import { renderWithProviders } from "../test-utils/testUtils";

export type LocalTestContext = {
  view: ExtendedRenderResult;
};

describe<LocalTestContext>("render App", it => {
  beforeEach<LocalTestContext>(async context => {
    const view = await renderWithProviders(<App />);
    context.view = view;
  });

  it("selectors ui", ({ view }) => {
    expect(selectVendorsLinks.recomputations()).toBe(0);
    expect(selectItemNumber.recomputations()).toBe(0);
    expect(selectItemSrc.recomputations()).toBe(0);
    expect(selectItemName.recomputations()).toBe(0);
    expect(selectVendorIdsByItemId.recomputations()).toBe(0);
    expect(selectItemNamesAndKeywords.recomputations()).toBe(1);
    expect(checkIfAnyItemsAdded.recomputations()).toBe(1);
    expect(selectCartItemsIds.recomputations()).toBe(8);
    expect(selectCartItemNamesStringified.recomputations()).toBe(0);
    expect(selectCheckedVendorIds.recomputations()).toBe(0);
    expect(isVendorChecked.recomputations()).toBe(0);
    expect(isMinimized.recomputations()).toBe(0);
    expect(selectCategoryName.recomputations()).toBe(18);
    expect(selectCategoryItemIds.recomputations()).toBe(18);
    expect(checkIfAddedToVendor.recomputations()).toBe(0);
    expect(selectCartItemsLength.recomputations()).toBe(1);
    expect(checkIfAnyAddedToOneVendor.recomputations()).toBe(1);
    expect(selectQRCodeText.recomputations()).toBe(0);
    expect(selectOfficialName.recomputations()).toBe(8);
    expect(selectVendorItemIds.recomputations()).toBe(8);
    expect(selectCartsByItemId.recomputations()).toBe(0);
    expect(checkIfAddedToAllVendors.recomputations()).toBe(0);
    console.log(ADAPTER_SELECTORS.GLOBAL.cart.selectById);
    // expect(ADAPTER_SELECTORS.GLOBAL.cart.selectById);
    const { store } = view;
    const state = store.getState();
    expect(selectVendorsData(state).ids).toBeArrayOfSize(8);
    expect(selectOfficialName.recomputations()).toBe(
      selectVendorsData.lastResult().ids.length
    );
  });
});
