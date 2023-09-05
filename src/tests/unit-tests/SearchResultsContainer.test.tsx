import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";

import InputGroupComponent from "../../components/InputComponents/InputGroupComponent";
import type { ExtendedRenderResult } from "../test-utils/testUtils";
import { renderWithProviders } from "../test-utils/testUtils";

type LocalTestContext = {
  renderResult: ExtendedRenderResult;
};

const it = test<LocalTestContext>;

describe("inputGroupComponent", () => {
  beforeEach<LocalTestContext>(async context => {
    const renderResult = await renderWithProviders(<InputGroupComponent />);
    context.renderResult = renderResult;
  });

  it("10 search results show up when typing a letter.", async ({
    renderResult,
  }) => {
    const { getAllByText, queryByText, getByRole, store } = renderResult;
    const inputField = getByRole("search");
    expect(inputField).toBeInTheDocument();
    await userEvent.click(inputField);
    expect(store.getState().added.searchResults.ids).toHaveLength(0);
    await userEvent.type(inputField, "a");
    const buttons = getAllByText("Add");
    expect(buttons).toHaveLength(10);
    const targetedButton = buttons[0];
    if (!targetedButton) {
      return;
    }
    expect(targetedButton).toBeInTheDocument();
    expect(targetedButton).toBeVisible();
    await userEvent.click(targetedButton);
    const newButtons = getAllByText("Add");
    expect(newButtons).toHaveLength(10);
    expect(targetedButton).not.toBeInTheDocument();
    expect(targetedButton).not.toBeVisible();
    await userEvent.click(inputField);
    await userEvent.keyboard("[Backspace]");
    expect(queryByText("Add")).toBeNull();
  });
});
