import axios from "axios";
import { beforeEach, describe, expectTypeOf } from "vitest";

import API_URL from "../data/fetchInfo";
import type { OldSupplies } from "../types/api";
import type { NewApiContext, OldApiContext } from "./api.test";

// const oldApiTest = it<OldApiContext>;

// const newApiTest = it<NewApiContext>;

describe<OldApiContext>("type checking old api", it => {
  beforeEach<OldApiContext>(async context => {
    const response = await axios.get<OldSupplies>(API_URL);
    const { data } = response;
    context.data = data;
  });

  it("old supplies", ({ data }) => {
    const { items, vendors, categories } = data;
    expectTypeOf(items).toBeArray();
    expectTypeOf(vendors).not.toBeArray();
    expectTypeOf(categories).not.toBeArray();
  });
});

describe.todo<NewApiContext>("type checking new api", it => {
  it("new supplies", ({ data }) => {
    const { items, vendors, categories } = data;
    expectTypeOf(items).toBeArray();
    expectTypeOf(vendors).toBeArray();
    expectTypeOf(categories).toBeArray();
  });
});
