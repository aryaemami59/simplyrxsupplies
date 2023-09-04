import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "../../test-utils/testUtils";
import InputGroupComponent from "../InputComponents/InputGroupComponent";

describe("inputGroupComponent", () => {
  it("10 search results show up when typing a letter.", async () => {
    const { container, getAllByText } = await renderWithProviders(
      <InputGroupComponent />
    );
    const inputField = container.querySelector("input");
    expect(inputField).toBeInTheDocument();
    if (!inputField) {
      return;
    }
    await userEvent.click(inputField);
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
  });
});
