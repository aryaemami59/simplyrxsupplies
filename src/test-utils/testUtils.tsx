import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { FC, ReactElement } from "react";
import { Provider } from "react-redux";

import apiSlice from "../redux/apiSlice";
import type { AppStore, RootState } from "../redux/store";
import { setupStore } from "../redux/store";
import type { PropsWithRequiredChildren } from "../types/tsHelpers";

/**
 * This type extends the default options for render from RTL, as well as allows the user to specify other things such as initialState, store.
 */
export type ExtendedRenderOptions = {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  fetch?: boolean;
} & Omit<RenderOptions, "queries">;

/**
 * A wrapper for {@link render}
 * @param ui - Component to render.
 * @param options - Options object.
 * @param options.preloadedState - The optional preloaded state.
 * @param options.store - The optional store.
 * @param options.fetch - The optional fetch.
 * @returns An object with the store and all of RTL's query functions
 */
export const renderWithProviders = async (
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    fetch = true,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  // setupListeners(store.dispatch);
  if (fetch) {
    await store.dispatch(apiSlice.endpoints.getMain.initiate());
  }

  const Wrapper: FC<PropsWithRequiredChildren> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
