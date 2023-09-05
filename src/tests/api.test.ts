import axios from "axios";
import { describe, expect, it } from "vitest";

import API_URL from "../data/fetchInfo";
import type { OldSupplies, Supplies } from "../types/api";
import { newSuppliesSample, oldSuppliesSample } from "./test-utils/testUtils";

export type OldApiContext = {
  data: OldSupplies;
};

export type NewApiContext = {
  data: Supplies;
};

const oldApiTest = it.extend<OldApiContext>({
  data: async ({ task }, use) => {
    const response = await axios.get<OldSupplies>(API_URL);
    const { data } = response;
    await use(data);
  },
});

const newApiTest = it.extend<NewApiContext>({
  data: async ({ task }, use) => {
    const response = await axios.get<Supplies>(API_URL);
    const { data } = response;
    await use(data);
  },
});

describe("old api", () => {
  oldApiTest("data has properties", ({ data }) => {
    expect(data).toHaveProperty("items");
    expect(data).toHaveProperty("vendors");
    expect(data).toHaveProperty("categories");
  });

  oldApiTest("old items", ({ data }) => {
    const { items } = data;
    expect(Array.isArray(items)).toBe(true);
    expect(items).toEqual(expect.arrayContaining(oldSuppliesSample.items));
  });

  oldApiTest("old vendors", ({ data }) => {
    const { vendors } = data;
    expect(vendors).toBeTypeOf("object");
    expect(vendors).toHaveProperty("MCK");
    expect(vendors).toEqual(expect.objectContaining(oldSuppliesSample.vendors));
  });

  oldApiTest("old categories", ({ data }) => {
    const { categories } = data;
    expect(categories).toBeTypeOf("object");
    expect(categories).toEqual(
      expect.objectContaining(oldSuppliesSample.categories)
    );
    expect(categories).toHaveProperty("Vials");
  });
});

describe.todo("new api", () => {
  newApiTest("new items", ({ data }) => {
    const { items } = data;
    expect(Array.isArray(items)).toBe(true);
    expect(items).toEqual(expect.arrayContaining(newSuppliesSample.items));
  });

  newApiTest("new vendors", ({ data }) => {
    const { vendors } = data;
    expect(Array.isArray(vendors)).toBe(true);
    expect(vendors).toEqual(expect.arrayContaining(newSuppliesSample.vendors));
  });

  newApiTest("new categories", ({ data }) => {
    const { categories } = data;
    expect(Array.isArray(categories)).toBe(true);
    expect(categories).toEqual(
      expect.arrayContaining(newSuppliesSample.categories)
    );
  });
});
