import type { ByRoleOptions } from "@testing-library/react"
import InputGroupComponent from "../../components/InputComponents/InputGroupComponent.js"
import {
  resetAllSelectors,
  selectItemNamesAndKeywords,
} from "../../redux/selectors.js"
import type {
  ExtendedRenderResult,
  LocalBaseTestContext,
} from "../test-utils/testUtils.js"
import {
  isNode24,
  queryByRoleFactory,
  renderWithProviders,
} from "../test-utils/testUtils.js"

type LocalTestContext = LocalBaseTestContext<ExtendedRenderResult> & {
  view: ExtendedRenderResult
  inputField: HTMLInputElement
}

const localTest = test.extend<LocalTestContext>({
  setupResults: [renderWithProviders(<InputGroupComponent />), { auto: false }],
  store: [
    async ({ view }, use) => {
      const { store } = view

      await use(store)
    },
    { auto: false },
  ],
  initialState: [
    async ({ store }, use) => {
      const initialState = store.getState()

      await use(initialState)
    },
    { auto: false },
  ],
  view: [
    async ({ setupResults }, use) => {
      const view = await setupResults

      await use(view)
    },
    { auto: false },
  ],
  inputField: [
    async ({ view }, use) => {
      // FIXME: This is a workaround for the issue with the input field not being found.
      await renderWithProviders(<InputGroupComponent />)
      const inputField = await view.screen.findByRole<HTMLInputElement>(
        "search",
        {
          name: "Search",
        },
      )

      await use(inputField)
    },
    { auto: false },
  ],
})

const byRoleOptions: ByRoleOptions = { name: "Add" }

const { getAllButtonsByRole, getButtonByRole, queryButtonByRole } =
  queryByRoleFactory<HTMLButtonElement, "button">("button", byRoleOptions)

describe("search results", () => {
  beforeEach(() => {
    resetAllSelectors()
  })

  localTest("input field exists", ({ inputField }) => {
    expect(inputField).toBeInTheDocument()
    expect(inputField).toBeVisible()
    expect(inputField).toHaveFocus()
  })

  localTest.skipIf(isNode24)(
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
