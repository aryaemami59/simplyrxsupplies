import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { apiSlice } from "./redux/apiSlice"
import { allSelectors } from "./redux/selectors"
import { store } from "./redux/store"

if (import.meta.env.DEV) {
  const { default: whyDidYouRender } = await import(
    "@welldone-software/why-did-you-render"
  )
  const {
    getStateWith,
    registerSelectors,
    selectorGraph,
    checkSelector,
    reset,
  } = await import("reselect-tools")
  getStateWith(store.getState)
  registerSelectors(allSelectors)
  selectorGraph()
  checkSelector(allSelectors.selectCartItemsIds)
  // console.log(__RESELECT_TOOLS__)
  // console.log(globalThis.__RESELECT_TOOLS__)
  // console.log(window.__RESELECT_TOOLS__)
  reset()
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    // include: [/./gi],
    collapseGroups: true,
    trackHooks: true,
  })
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

const container = document.getElementById("root") as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
