import axios from "axios";
import { describe, expect, expectTypeOf, it } from "vitest";

import GITHUB_URL_ITEMS from "../data/fetchInfo";
import type { OldSupplies } from "../types/api";

describe("api", () => {
  it("data has properties", async () => {
    const response = await axios.get<OldSupplies>(GITHUB_URL_ITEMS);
    const { data } = response;
    expect(data).toHaveProperty("items");
    expect(data).toHaveProperty("vendors");
    expect(data).toHaveProperty("categories");
    const { items, categories, vendors } = data;
    expect(Array.isArray(items)).toBeTruthy();
    expectTypeOf(items).toBeArray();
    expect(vendors).toBeTypeOf("object");
    expectTypeOf(vendors).not.toBeArray();
    expect(categories).toBeTypeOf("object");
    expectTypeOf(categories).not.toBeArray();
    expect(vendors).toHaveProperty("MCK");
    expect(items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(Number) }),
      ])
    );
    expect(categories).toHaveProperty("Vials");
  });
});
