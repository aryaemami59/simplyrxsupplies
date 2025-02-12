import { screen } from "@testing-library/react"
import { beforeEach, describe } from "vitest"
import App from "../../App.js"
import { selectVendorsData } from "../../redux/apiSlice.js"
import { findFastestSelector } from "../../redux/createSelectors.js"
import {
  checkIfAddedToAllVendors,
  checkIfAddedToVendor,
  checkIfAnyAddedToOneVendor,
  checkIfAnyItemsAdded,
  isMinimized,
  isVendorChecked,
  resetAllSelectors,
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
  selectVendorsLinks,
} from "../../redux/selectors.js"
import type { ExtendedRenderResult } from "../test-utils/testUtils.js"
import { renderWithProviders } from "../test-utils/testUtils.js"

type LocalTestContext = {
  view: ExtendedRenderResult
}

describe<LocalTestContext>("render App", it => {
  beforeEach<LocalTestContext>(async context => {
    resetAllSelectors()

    vi.stubGlobal("innerWidth", 1920)

    vi.stubGlobal("innerHeight", 2000)

    const view = await renderWithProviders(<App />)

    context.view = view
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("selectors ui", async ({ expect, onTestFailed, view }) => {
    expect(selectVendorsLinks.recomputations()).toBe(0)
    expect(selectItemNumber.recomputations()).toBe(0)
    expect(selectItemSrc.recomputations()).toBe(0)
    expect(selectItemName.recomputations()).toBe(0)
    expect(selectVendorIdsByItemId.recomputations()).toBe(0)
    expect(selectItemNamesAndKeywords.recomputations()).toBe(1)
    expect(checkIfAnyItemsAdded.recomputations()).toBe(1)
    expect(selectCartItemsIds.recomputations()).toBe(8)
    expect(selectCartItemNamesStringified.recomputations()).toBe(0)
    expect(selectCheckedVendorIds.recomputations()).toBe(0)
    expect(isVendorChecked.recomputations()).toBe(0)
    expect(isMinimized.recomputations()).toBe(0)
    expect(selectCategoryName.recomputations()).toBe(18)
    expect(selectCategoryItemIds.recomputations()).toBe(18)
    expect(checkIfAddedToVendor.recomputations()).toBe(0)
    expect(selectCartItemsLength.recomputations()).toBe(1)
    expect(checkIfAnyAddedToOneVendor.recomputations()).toBe(1)
    expect(selectQRCodeText.recomputations()).toBe(0)
    expect(selectOfficialVendorName.recomputations()).toBe(8)
    expect(selectVendorItemIds.recomputations()).toBe(8)
    expect(selectCartsByItemId.recomputations()).toBe(0)
    expect(checkIfAddedToAllVendors.recomputations()).toBe(0)
    expect(selectCartsItemIdsLength.recomputations()).toBe(1)
    const { store, user, container } = view
    const state = store.getState()
    expect(selectVendorsData(state).ids).toBeArrayOfSize(8)
    expect(selectOfficialVendorName.recomputations()).toBe(
      selectVendorsData.lastResult().ids.length,
    )
    const inputField = screen.getByRole<HTMLInputElement>("search", {
      name: "Search",
    })
    await user.type(inputField, "a")
    expect(selectVendorsLinks.recomputations()).toBe(0)
    expect(selectItemNumber.recomputations()).toBe(0)
    expect(selectItemSrc.recomputations()).toBe(0)
    expect(selectItemName.recomputations()).toBe(10)
    expect(selectVendorIdsByItemId.recomputations()).toBe(10)
    expect(selectItemNamesAndKeywords.recomputations()).toBe(1)
    expect(checkIfAnyItemsAdded.recomputations()).toBe(1)
    expect(selectCartItemsIds.recomputations()).toBe(8)
    expect(selectCartItemNamesStringified.recomputations()).toBe(0)
    expect(selectCheckedVendorIds.recomputations()).toBe(0)
    expect(isVendorChecked.recomputations()).toBe(12)
    expect(isMinimized.recomputations()).toBe(0)
    expect(selectCategoryName.recomputations()).toBe(18)
    expect(selectCategoryItemIds.recomputations()).toBe(18)
    expect(checkIfAddedToVendor.recomputations()).toBe(10)
    expect(selectCartItemsLength.recomputations()).toBe(1)
    expect(checkIfAnyAddedToOneVendor.recomputations()).toBe(1)
    expect(selectQRCodeText.recomputations()).toBe(0)
    expect(selectOfficialVendorName.recomputations()).toBe(8)
    expect(selectVendorItemIds.recomputations()).toBe(8)
    expect(selectCartsByItemId.recomputations()).toBe(10)
    expect(checkIfAddedToAllVendors.recomputations()).toBe(10)
    expect(selectCartsItemIdsLength.recomputations()).toBe(1)
    const addButtons = screen.getAllByRole<HTMLButtonElement>("button", {
      name: "Add",
    })
    const targetButton = addButtons[0]
    if (!targetButton) {
      return
    }
    await user.click(targetButton)
    expect(selectVendorsLinks.recomputations()).toBe(2)
    expect(selectItemNumber.recomputations()).toBe(1)
    expect(selectItemSrc.recomputations()).toBe(1)
    expect(selectItemName.recomputations()).toBe(11)
    expect(selectVendorIdsByItemId.recomputations()).toBe(11)
    expect(selectItemNamesAndKeywords.recomputations()).toBe(1)
    expect(checkIfAnyItemsAdded.recomputations()).toBe(2)
    expect(selectCartItemsIds.recomputations()).toBe(10)
    expect(selectCartItemNamesStringified.recomputations()).toBe(2)
    expect(selectCheckedVendorIds.recomputations()).toBe(0)
    expect(isVendorChecked.recomputations()).toBe(15)
    expect(isMinimized.recomputations()).toBe(2)
    expect(selectCategoryName.recomputations()).toBe(18)
    expect(selectCategoryItemIds.recomputations()).toBe(18)
    expect(checkIfAddedToVendor.recomputations()).toBe(15)
    expect(selectCartItemsLength.recomputations()).toBe(3)
    expect(checkIfAnyAddedToOneVendor.recomputations()).toBe(2)
    expect(selectQRCodeText.recomputations()).toBe(2)
    expect(selectOfficialVendorName.recomputations()).toBe(8)
    expect(selectVendorItemIds.recomputations()).toBe(8)
    expect(selectCartsByItemId.recomputations()).toBe(21)
    expect(checkIfAddedToAllVendors.recomputations()).toBe(21)
    expect(selectCartsItemIdsLength.recomputations()).toBe(2)
    await user.clear(inputField)
    const accordionSummaries = container.querySelectorAll<HTMLDivElement>(
      ".MuiAccordionSummary-root",
    )
    const targetedAccordionSummary = accordionSummaries[0]
    expect(targetedAccordionSummary).toBeInTheDocument()
    onTestFailed(() => {
      view.debug()
    })
    expect(targetedAccordionSummary).toBeVisible()
    if (!targetedAccordionSummary) {
      return
    }
    await user.click(targetedAccordionSummary)
    expect(selectVendorsLinks.recomputations()).toBe(2)
    expect(selectItemNumber.recomputations()).toBe(1)
    expect(selectItemSrc.recomputations()).toBe(1)
    expect(selectItemName.recomputations()).toBe(16)
    expect(selectVendorIdsByItemId.recomputations()).toBe(16)
    expect(selectItemNamesAndKeywords.recomputations()).toBe(1)
    expect(checkIfAnyItemsAdded.recomputations()).toBe(2)
    expect(selectCartItemsIds.recomputations()).toBe(10)
    expect(selectCartItemNamesStringified.recomputations()).toBe(2)
    expect(selectCheckedVendorIds.recomputations()).toBe(5)
    expect(isVendorChecked.recomputations()).toBe(25)
    expect(isMinimized.recomputations()).toBe(2)
    expect(selectCategoryName.recomputations()).toBe(18)
    expect(selectCategoryItemIds.recomputations()).toBe(18)
    expect(checkIfAddedToVendor.recomputations()).toBe(25)
    expect(selectCartItemsLength.recomputations()).toBe(3)
    expect(checkIfAnyAddedToOneVendor.recomputations()).toBe(2)
    expect(selectQRCodeText.recomputations()).toBe(2)
    expect(selectOfficialVendorName.recomputations()).toBe(8)
    expect(selectVendorItemIds.recomputations()).toBe(8)
    expect(selectCartsByItemId.recomputations()).toBe(26)
    expect(checkIfAddedToAllVendors.recomputations()).toBe(26)
    expect(selectCartsItemIdsLength.recomputations()).toBe(2)
    const item = view.getByRole("button", {
      name: /10 dram vials/iu,
    })
    await user.click(item)
    expect(selectVendorsLinks.recomputations()).toBe(2)
    expect(selectItemNumber.recomputations()).toBe(2)
    expect(selectItemSrc.recomputations()).toBe(2)
    expect(selectItemName.recomputations()).toBe(16)
    expect(selectVendorIdsByItemId.recomputations()).toBe(16)
    expect(selectItemNamesAndKeywords.recomputations()).toBe(1)
    expect(checkIfAnyItemsAdded.recomputations()).toBe(3)
    expect(selectCartItemsIds.recomputations()).toBe(12)
    expect(selectCartItemNamesStringified.recomputations()).toBe(4)
    expect(selectCheckedVendorIds.recomputations()).toBe(6)
    expect(isVendorChecked.recomputations()).toBe(27)
    expect(isMinimized.recomputations()).toBe(4)
    expect(selectCategoryName.recomputations()).toBe(18)
    expect(selectCategoryItemIds.recomputations()).toBe(18)
    expect(checkIfAddedToVendor.recomputations()).toBe(35)
    expect(selectCartItemsLength.recomputations()).toBe(5)
    expect(checkIfAnyAddedToOneVendor.recomputations()).toBe(3)
    expect(selectQRCodeText.recomputations()).toBe(4)
    expect(selectOfficialVendorName.recomputations()).toBe(8)
    expect(selectVendorItemIds.recomputations()).toBe(8)
    expect(selectCartsByItemId.recomputations()).toBe(31)
    expect(checkIfAddedToAllVendors.recomputations()).toBe(31)
    expect(selectCartsItemIdsLength.recomputations()).toBe(3)
    // const rec = Object.entries(mainSelectors).map(([key, value]) => ({
    //   [key]: value.recomputations(),
    // }))
    findFastestSelector(selectItemNamesAndKeywords, state)
    findFastestSelector(checkIfAnyItemsAdded, state)
    findFastestSelector(selectCartsItemIdsLength, state)
    findFastestSelector(selectItemNumber, state, 0)
    findFastestSelector(selectItemSrc, state, 0)
    findFastestSelector(selectItemName, state, 0)
    findFastestSelector(selectVendorIdsByItemId, state, 0)
    findFastestSelector(selectCartItemsIds, state, 0)
    findFastestSelector(selectCartItemNamesStringified, state, 0)
    findFastestSelector(selectCheckedVendorIds, state, 0)
    findFastestSelector(selectCategoryName, state, 0)
    findFastestSelector(selectCategoryItemIds, state, 0)
    findFastestSelector(selectCartItemsLength, state, 0)
    findFastestSelector(checkIfAnyAddedToOneVendor, state, 0)
    findFastestSelector(selectQRCodeText, state, 0)
    findFastestSelector(selectOfficialVendorName, state, 0)
    findFastestSelector(selectVendorItemIds, state, 0)
    findFastestSelector(checkIfAddedToAllVendors, state, 0)
    findFastestSelector(isVendorChecked, state, 0, 0)
    findFastestSelector(isMinimized, state, 0, 0)
    findFastestSelector(checkIfAddedToVendor, state, 0, 0)
  })

  // test.todo.each(Object.values(allSelectors))("multiple selectors", e => {})
})
