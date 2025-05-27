import type { ByRoleOptions } from "@testing-library/react"
import { screen } from "@testing-library/react"
import InputGroupComponent from "../../components/InputComponents/InputGroupComponent.js"
import {
  resetAllSelectors,
  selectItemNamesAndKeywords,
} from "../../redux/selectors.js"
import type { ExtendedRenderResult } from "../test-utils/testUtils.js"
import {
  isNode24,
  queryByRoleFactory,
  renderWithProviders,
} from "../test-utils/testUtils.js"

type LocalTestContext = {
  view: ExtendedRenderResult
  inputField: HTMLInputElement
}

const byRoleOptions: ByRoleOptions = { name: "Add" }

const { getAllButtonsByRole, getButtonByRole, queryButtonByRole } =
  queryByRoleFactory<HTMLButtonElement, "button">("button", byRoleOptions)

describe<LocalTestContext>("search results", it => {
  beforeEach<LocalTestContext>(async context => {
    resetAllSelectors()

    const view = await renderWithProviders(<InputGroupComponent />)

    const inputField = await screen.findByRole<HTMLInputElement>("search", {
      name: "Search",
    })

    context.view = view

    context.inputField = inputField
  })

  it("input field exists", ({ inputField }) => {
    expect(inputField).toBeInTheDocument()
    expect(inputField).toBeVisible()
    expect(inputField).toHaveFocus()
  })

  it.skipIf(isNode24)(
    "10 search results show up when typing a letter.",
    async ({ inputField, view }) => {
      const { user } = view
      await user.click(inputField)
      await user.type(inputField, "a")
      expect(selectItemNamesAndKeywords.recomputations()).toBe(1)
      const buttons = getAllButtonsByRole()
      expect(buttons).toBeArrayOfSize(10)
      const targetedButton = buttons[0]
      if (!targetedButton) {
        return
      }
      expect(targetedButton).toBeInTheDocument()
      expect(targetedButton).toBeVisible()
      await user.click(targetedButton)
      expect(getAllButtonsByRole()).toBeArrayOfSize(10)
      expect(targetedButton).not.toBeInTheDocument()
      expect(targetedButton).not.toBeVisible()
      await user.click(inputField)
      await user.keyboard("[Backspace]")
      expect(queryButtonByRole()).not.toBeInTheDocument()
      await user.type(inputField, "amber ten")
      expect(selectItemNamesAndKeywords.recomputations()).toBe(1)
      expect(getButtonByRole()).toBeInTheDocument()
      expect(getButtonByRole()).toBeVisible()
      await user.clear(inputField)
      await user.type(inputField, "10")
      expect(selectItemNamesAndKeywords.recomputations()).toBe(1)
    },
  )
})
