import { screen } from "@testing-library/react";
import { beforeEach, describe, test } from "vitest";

import App from "../../App";
import SideBarContainer from "../../components/SideBarComponents/SideBarContainer";
import { selectVendorsData } from "../../redux/apiSlice";
import { findFastestSelector } from "../../redux/createSelectors";
import allSelectors, {
  checkIfAddedToAllVendors,
  checkIfAddedToVendor,
  checkIfAnyAddedToOneVendor,
  checkIfAnyItemsAdded,
  isMinimized,
  isVendorChecked,
  mainSelectors,
  resetAllSelectors,
  selectCartItemNamesStringified,
  selectCartItemsIds,
  selectCartItemsLength,
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
  selectVendorsLinks,
} from "../../redux/selectors";
import type { ExtendedRenderResult } from "../test-utils/testUtils";
import { createMatchMedia, renderWithProviders } from "../test-utils/testUtils";

type LocalTestContext = {
  view: ExtendedRenderResult;
};

describe<LocalTestContext>("render App", it => {
  beforeEach<LocalTestContext>(async context => {
    window.innerWidth = 1920;
    resetAllSelectors();
    window.matchMedia = createMatchMedia(window.innerWidth);
    const view = await renderWithProviders(<App />);
    context.view = view;
    // getStateWith(() => view.store.getState())
    // registerSelectors(allSelectors)

    return () => {
      resetAllSelectors();
    };
  });

  it("selectors ui", async ({ view, expect }) => {
    // console.log(it)
    expect.soft(selectVendorsLinks.recomputations()).toBe(0);
    expect.soft(selectItemNumber.recomputations()).toBe(0);
    expect.soft(selectItemSrc.recomputations()).toBe(0);
    expect.soft(selectItemName.recomputations()).toBe(0);
    expect.soft(selectVendorIdsByItemId.recomputations()).toBe(0);
    expect.soft(selectItemNamesAndKeywords.recomputations()).toBe(1);
    expect.soft(checkIfAnyItemsAdded.recomputations()).toBe(1);
    expect.soft(selectCartItemsIds.recomputations()).toBe(8);
    expect.soft(selectCartItemNamesStringified.recomputations()).toBe(0);
    expect.soft(selectCheckedVendorIds.recomputations()).toBe(0);
    expect.soft(isVendorChecked.recomputations()).toBe(0);
    expect.soft(isMinimized.recomputations()).toBe(0);
    expect.soft(selectCategoryName.recomputations()).toBe(18);
    expect.soft(selectCategoryItemIds.recomputations()).toBe(18);
    expect.soft(checkIfAddedToVendor.recomputations()).toBe(0);
    expect
      .soft(selectCartItemsLength.recomputations(), selectCartItemsLength.name)
      .toBe(1);
    expect
      .soft(
        checkIfAnyAddedToOneVendor.recomputations(),
        checkIfAnyAddedToOneVendor.name
      )
      .toBe(1);
    expect.soft(selectQRCodeText.recomputations()).toBe(0);
    expect.soft(selectOfficialVendorName.recomputations()).toBe(8);
    expect.soft(selectVendorItemIds.recomputations()).toBe(8);
    expect.soft(checkIfAddedToAllVendors.recomputations()).toBe(0);
    const { store, user, container } = view;
    const state = store.getState();
    expect.soft(selectVendorsData(state).ids).toBeArrayOfSize(8);
    expect
      .soft(selectOfficialVendorName.recomputations())
      .toBe(selectVendorsData.lastResult().ids.length);
    const inputField = screen.getByRole<HTMLInputElement>("search", {
      name: "Search",
    });
    await user.type(inputField, "a");
    expect.soft(selectVendorsLinks.recomputations()).toBe(0);
    expect.soft(selectItemNumber.recomputations()).toBe(0);
    expect.soft(selectItemSrc.recomputations()).toBe(0);
    expect.soft(selectItemName.recomputations()).toBe(10);
    expect.soft(selectVendorIdsByItemId.recomputations()).toBe(10);
    expect.soft(selectItemNamesAndKeywords.recomputations()).toBe(1);
    expect.soft(checkIfAnyItemsAdded.recomputations()).toBe(1);
    expect.soft(selectCartItemsIds.recomputations()).toBe(8);
    expect.soft(selectCartItemNamesStringified.recomputations()).toBe(0);
    expect.soft(selectCheckedVendorIds.recomputations()).toBe(0);
    expect.soft(isVendorChecked.recomputations()).toBe(12);
    expect.soft(isMinimized.recomputations()).toBe(0);
    expect.soft(selectCategoryName.recomputations()).toBe(18);
    expect.soft(selectCategoryItemIds.recomputations()).toBe(18);
    expect.soft(checkIfAddedToVendor.recomputations()).toBe(10);
    expect
      .soft(selectCartItemsLength.recomputations(), selectCartItemsLength.name)
      .toBe(1);
    expect
      .soft(
        checkIfAnyAddedToOneVendor.recomputations(),
        checkIfAnyAddedToOneVendor.name
      )
      .toBe(1);
    expect.soft(selectQRCodeText.recomputations()).toBe(0);
    expect.soft(selectOfficialVendorName.recomputations()).toBe(8);
    expect.soft(selectVendorItemIds.recomputations()).toBe(8);
    expect.soft(checkIfAddedToAllVendors.recomputations()).toBe(10);
    const addButtons = screen.getAllByRole<HTMLButtonElement>("button", {
      name: "Add",
    });
    const targetButton = addButtons[0];
    if (!targetButton) {
      return;
    }
    await user.click(targetButton);
    expect.soft(selectVendorsLinks.recomputations()).toBe(2);
    expect.soft(selectItemNumber.recomputations()).toBe(1);
    expect.soft(selectItemSrc.recomputations()).toBe(1);
    expect.soft(selectItemName.recomputations()).toBe(11);
    expect.soft(selectVendorIdsByItemId.recomputations()).toBe(11);
    expect.soft(selectItemNamesAndKeywords.recomputations()).toBe(1);
    expect.soft(checkIfAnyItemsAdded.recomputations()).toBe(2);
    expect.soft(selectCartItemsIds.recomputations()).toBe(10);
    expect.soft(selectCartItemNamesStringified.recomputations()).toBe(2);
    expect.soft(selectCheckedVendorIds.recomputations()).toBe(0);
    expect.soft(isVendorChecked.recomputations()).toBe(15);
    expect.soft(isMinimized.recomputations()).toBe(2);
    expect.soft(selectCategoryName.recomputations()).toBe(18);
    expect.soft(selectCategoryItemIds.recomputations()).toBe(18);
    expect.soft(checkIfAddedToVendor.recomputations()).toBe(15);
    expect
      .soft(selectCartItemsLength.recomputations(), selectCartItemsLength.name)
      .toBe(3);
    expect
      .soft(
        checkIfAnyAddedToOneVendor.recomputations(),
        checkIfAnyAddedToOneVendor.name
      )
      .toBe(2);
    expect.soft(selectQRCodeText.recomputations()).toBe(2);
    expect.soft(selectOfficialVendorName.recomputations()).toBe(8);
    expect.soft(selectVendorItemIds.recomputations()).toBe(8);
    expect.soft(checkIfAddedToAllVendors.recomputations()).toBe(21);
    await user.clear(inputField);
    const { getByRole } = await renderWithProviders(<SideBarContainer />, {
      fetch: false,
    });
    const accordionSummaries = container.querySelectorAll<HTMLDivElement>(
      ".MuiAccordionSummary-root"
    );
    const targetedAccordionSummary = accordionSummaries[0];
    expect(targetedAccordionSummary).toBeInTheDocument();
    expect(targetedAccordionSummary).toBeVisible();
    if (!targetedAccordionSummary) {
      return;
    }
    await user.click(targetedAccordionSummary);
    expect.soft(selectVendorsLinks.recomputations()).toBe(2);
    expect.soft(selectItemNumber.recomputations()).toBe(1);
    expect.soft(selectItemSrc.recomputations()).toBe(1);
    expect.soft(selectItemName.recomputations()).toBe(16);
    expect.soft(selectVendorIdsByItemId.recomputations()).toBe(16);
    expect.soft(selectItemNamesAndKeywords.recomputations()).toBe(1);
    expect.soft(checkIfAnyItemsAdded.recomputations()).toBe(2);
    expect.soft(selectCartItemsIds.recomputations()).toBe(10);
    expect.soft(selectCartItemNamesStringified.recomputations()).toBe(2);
    expect.soft(selectCheckedVendorIds.recomputations()).toBe(5);
    expect.soft(isVendorChecked.recomputations()).toBe(25);
    expect.soft(isMinimized.recomputations()).toBe(2);
    expect.soft(selectCategoryName.recomputations()).toBe(18);
    expect.soft(selectCategoryItemIds.recomputations()).toBe(18);
    expect.soft(checkIfAddedToVendor.recomputations()).toBe(25);
    expect
      .soft(selectCartItemsLength.recomputations(), selectCartItemsLength.name)
      .toBe(3);
    expect
      .soft(
        checkIfAnyAddedToOneVendor.recomputations(),
        checkIfAnyAddedToOneVendor.name
      )
      .toBe(2);
    expect.soft(selectQRCodeText.recomputations()).toBe(2);
    expect.soft(selectOfficialVendorName.recomputations()).toBe(8);
    expect.soft(selectVendorItemIds.recomputations()).toBe(8);
    expect.soft(checkIfAddedToAllVendors.recomputations()).toBe(26);
    const item = getByRole("button", {
      name: /10 dram vials/iu,
    });
    await user.click(item);
    expect.soft(selectVendorsLinks.recomputations()).toBe(2);
    expect.soft(selectItemNumber.recomputations()).toBe(2);
    expect.soft(selectItemSrc.recomputations()).toBe(2);
    expect.soft(selectItemName.recomputations()).toBe(16);
    expect.soft(selectVendorIdsByItemId.recomputations()).toBe(16);
    expect.soft(selectItemNamesAndKeywords.recomputations()).toBe(1);
    expect.soft(checkIfAnyItemsAdded.recomputations()).toBe(3);
    expect.soft(selectCartItemsIds.recomputations()).toBe(12);
    expect.soft(selectCartItemNamesStringified.recomputations()).toBe(4);
    expect.soft(selectCheckedVendorIds.recomputations()).toBe(6);
    expect.soft(isVendorChecked.recomputations()).toBe(27);
    expect.soft(isMinimized.recomputations()).toBe(4);
    expect.soft(selectCategoryName.recomputations()).toBe(18);
    expect.soft(selectCategoryItemIds.recomputations()).toBe(18);
    expect.soft(checkIfAddedToVendor.recomputations()).toBe(35);
    expect.soft(selectCartItemsLength.recomputations()).toBe(5);
    expect
      .soft(
        checkIfAnyAddedToOneVendor.recomputations(),
        checkIfAnyAddedToOneVendor.name
      )
      .toBe(3);
    expect.soft(selectQRCodeText.recomputations()).toBe(4);
    expect.soft(selectOfficialVendorName.recomputations()).toBe(8);
    expect.soft(selectVendorItemIds.recomputations()).toBe(8);
    expect.soft(checkIfAddedToAllVendors.recomputations()).toBe(31);
    // const lastResults = Object.values(allSelectors).map(e => ({
    //   [e.name]: e.lastResult(),
    // }))
    // expect(lastResults).toMatchSnapshot();
    const rec = Object.entries(mainSelectors).map(([key, value]) =>
      // if (!("recomputations" in e)) {
      //   console.log(e)
      // }
      ({
        [key]: value.recomputations(),
      })
    );
    expect.soft(rec).toMatchSnapshot();
    findFastestSelector(selectItemNamesAndKeywords, state);
    findFastestSelector(checkIfAnyItemsAdded, state);
    findFastestSelector(selectCartsItemIdsLength, state);
    findFastestSelector(selectItemNumber, state, 0);
    findFastestSelector(selectItemSrc, state, 0);
    findFastestSelector(selectItemName, state, 0);
    findFastestSelector(selectVendorIdsByItemId, state, 0);
    findFastestSelector(selectCartItemsIds, state, 0);
    findFastestSelector(selectCartItemNamesStringified, state, 0);
    findFastestSelector(selectCheckedVendorIds, state, 0);
    findFastestSelector(selectCategoryName, state, 0);
    findFastestSelector(selectCategoryItemIds, state, 0);
    findFastestSelector(selectCartItemsLength, state, 0);
    findFastestSelector(checkIfAnyAddedToOneVendor, state, 0);
    findFastestSelector(selectQRCodeText, state, 0);
    findFastestSelector(selectOfficialVendorName, state, 0);
    findFastestSelector(selectVendorItemIds, state, 0);
    findFastestSelector(checkIfAddedToAllVendors, state, 0);
    findFastestSelector(isVendorChecked, state, 0, 0);
    findFastestSelector(isMinimized, state, 0, 0);
    findFastestSelector(checkIfAddedToVendor, state, 0, 0);
    console.log(selectOfficialVendorName.recomputations());
  });

  test.todo.each(Object.values(allSelectors))("multiple selectors", e => {});
});
