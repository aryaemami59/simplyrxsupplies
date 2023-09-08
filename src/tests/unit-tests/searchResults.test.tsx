import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect } from "vitest";

import InputGroupComponent from "../../components/InputComponents/InputGroupComponent";
import type { ExtendedRenderResult } from "../test-utils/testUtils";
import { renderWithProviders } from "../test-utils/testUtils";

type LocalTestContext = {
  view: ExtendedRenderResult;
};

describe<LocalTestContext>("search results", it => {
  beforeEach<LocalTestContext>(async context => {
    const view = await renderWithProviders(<InputGroupComponent />);
    context.view = view;
  });

  it("10 search results show up when typing a letter.", async ({ view }) => {
    const { store } = view;
    const addedState = store.getState().added;
    const inputField = screen.getByRole<HTMLInputElement>("search", {
      name: /search/iu,
    });
    expect(inputField).toBeInTheDocument();
    await userEvent.click(inputField);
    expect(addedState.searchResults.ids).toBeEmptyArray();
    await userEvent.type(inputField, "a");
    const buttons = screen.getAllByRole<HTMLButtonElement>("button", {
      name: "Add",
    });
    expect(buttons).toBeArrayOfSize(10);
    const targetedButton = buttons[0];
    if (!targetedButton) {
      return;
    }
    expect(targetedButton).toBeInTheDocument();
    expect(targetedButton).toBeVisible();
    await userEvent.click(targetedButton);
    const newButtons = screen.getAllByRole<HTMLButtonElement>("button", {
      name: "Add",
    });
    expect(newButtons).toBeArrayOfSize(10);
    expect(targetedButton).not.toBeInTheDocument();
    expect(targetedButton).not.toBeVisible();
    await userEvent.click(inputField);
    await userEvent.keyboard("[Backspace]");
    expect(
      screen.queryByRole<HTMLButtonElement>("button", { name: "Add" })
    ).toBeNull();
    await userEvent.type(inputField, "amber ten");
    expect(
      screen.getByRole<HTMLButtonElement>("button", { name: "Add" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole<HTMLButtonElement>("button", { name: "Add" })
    ).toBeVisible();
  });
});
