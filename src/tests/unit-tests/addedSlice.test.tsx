import { beforeEach, describe, expect } from "vitest";

import App from "../../App";
import addedSlice, { addItemToCarts } from "../../redux/addedSlice";
import type { ExtendedRenderResult } from "../test-utils/testUtils";
import { renderWithProviders, unFreeze } from "../test-utils/testUtils";

type LocalTestContext = {
  renderResult: ExtendedRenderResult;
};

// const it = test<LocalTestContext>;

describe<LocalTestContext>("addedSlice reducers", it => {
  beforeEach<LocalTestContext>(async context => {
    const renderResult = await renderWithProviders(<App />);
    context.renderResult = renderResult;
  });

  it("addItemToCarts", ({ renderResult }) => {
    const { store } = renderResult;
    const initialState = structuredClone(store.getState()).added;
    // const initialState = unFreeze(store.getState()).added;
    expect(store.getState().added.cart.entities).toBeFrozen();
    expect(initialState.cart.entities).toBeExtensible();
    store.dispatch(addItemToCarts({ itemId: 0 }));
    expect(store.getState().added.cart.entities).not.toStrictEqual(
      initialState.cart.entities
    );
    expect(addedSlice.reducer(undefined, { type: "" })).toStrictEqual(
      unFreeze(addedSlice.getInitialState())
    );
    expect(
      addedSlice.reducer(addedSlice.getInitialState(), { type: "" })
    ).toStrictEqual(unFreeze(addedSlice.getInitialState()));
    expect(unFreeze(store.getState().added)).not.toStrictEqual(initialState);
    // expect(
    //   addedSlice.reducer(initialState, addItemToCarts({ itemId: 0 })).cart
    // ).toStrictEqual(initialState.cart);
  });
});
