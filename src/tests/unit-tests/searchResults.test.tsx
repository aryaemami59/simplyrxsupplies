import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect } from "vitest";

import App from "../../App";
import type { ExtendedRenderResult } from "../test-utils/testUtils";
import { renderWithProviders } from "../test-utils/testUtils";

type LocalTestContext = {
  renderResult: ExtendedRenderResult;
};

// const it = test<LocalTestContext>;

describe<LocalTestContext>("search results", it => {
  beforeEach<LocalTestContext>(async context => {
    const renderResult = await renderWithProviders(<App />);
    context.renderResult = renderResult;
  });

  it("10 search results show up when typing a letter.", async ({
    renderResult,
  }) => {
    const { getAllByText, queryByText, getByRole, store } = renderResult;
    const addedState = store.getState().added;
    const inputField = getByRole("search");
    expect(inputField).toBeInTheDocument();
    await userEvent.click(inputField);
    expect(addedState.searchResults.ids).toBeArrayOfSize(0);
    await userEvent.type(inputField, "a");
    const buttons = getAllByText(
      (content, element) =>
        element?.tagName.toLowerCase() === "button" && content === "Add"
    );
    expect(buttons).toBeArrayOfSize(10);
    const targetedButton = buttons[0];
    if (!targetedButton) {
      return;
    }
    expect(targetedButton).toBeInTheDocument();
    expect(targetedButton).toBeVisible();
    await userEvent.click(targetedButton);
    const newButtons = getAllByText("Add") as HTMLButtonElement[];
    expect(newButtons).toBeArrayOfSize(10);
    expect(targetedButton).not.toBeInTheDocument();
    expect(targetedButton).not.toBeVisible();
    await userEvent.click(inputField);
    await userEvent.keyboard("[Backspace]");
    expect(queryByText("Add")).toBeNull();
  });
});
