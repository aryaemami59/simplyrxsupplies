import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App.js"
import { apiSlice } from "./redux/apiSlice.js"
import { allSelectors } from "./redux/selectors.js"
import { store } from "./redux/store.js"

if (import.meta.env.DEV) {
  // const { default: whyDidYouRender } = await import(
  //   "@welldone-software/why-did-you-render"
  // )
  const {
    getStateWith,
    registerSelectors,
    selectorGraph,
    checkSelector,
    reset,
  } = await import("reselect-tools")
  // eslint-disable-next-line @typescript-eslint/unbound-method
  getStateWith(store.getState)
  registerSelectors(allSelectors)
  selectorGraph()
  checkSelector(allSelectors.selectCartItemsIds)
  // console.log(__RESELECT_TOOLS__)
  // console.log(globalThis.__RESELECT_TOOLS__)
  // console.log(window.__RESELECT_TOOLS__)
  reset()
  // whyDidYouRender(React, {
  //   trackAllPureComponents: true,
  //   // include: [/./gi],
  //   collapseGroups: true,
  //   trackHooks: true,
  // })
}

if (import.meta.vitest) {
  const { it, expectTypeOf } = import.meta.vitest

  it("window.__RESELECT_TOOLS__ should have the correct types", () => {
    expectTypeOf(window.__RESELECT_TOOLS__)
      .toHaveProperty("selectorGraph")
      .toBeFunction()

    expectTypeOf(window.__RESELECT_TOOLS__)
      .toHaveProperty("checkSelector")
      .toBeFunction()
  })
}

void store.dispatch(apiSlice.endpoints.getMain.initiate())

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
