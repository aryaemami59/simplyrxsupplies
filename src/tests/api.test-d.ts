import axios from "axios";
import { beforeEach, describe, expectTypeOf, it } from "vitest";

import API_URL from "../data/fetchInfo";
import type { OldSupplies } from "../types/api";
import type { NewApiContext, OldApiContext } from "./api.test";

const oldApiTest = it<OldApiContext>;

const newApiTest = it<NewApiContext>;

describe("type checking old api", () => {
  beforeEach<OldApiContext>(async context => {
    const response = await axios.get<OldSupplies>(API_URL);
    const { data } = response;
    context.data = data;
  });

  oldApiTest("old supplies", ({ data }) => {
    const { items, vendors, categories } = data;
    expectTypeOf(items).toBeArray();
    expectTypeOf(vendors).not.toBeArray();
    expectTypeOf(categories).not.toBeArray();
  });
});

describe.todo("type checking new api", () => {
  newApiTest("new supplies", ({ data }) => {
    const { items, vendors, categories } = data;
    expectTypeOf(items).toBeArray();
    expectTypeOf(vendors).toBeArray();
    expectTypeOf(categories).toBeArray();
  });
});
