import "@testing-library/jest-dom/vitest";

import { rest } from "msw";
import { setupServer } from "msw/node";

import GITHUB_URL_ITEMS from "./src/data/fetchInfo";

export const handlers = [
  rest.get(GITHUB_URL_ITEMS, (req, res, ctx) =>
    res(ctx.json("John Smith"), ctx.delay(150))
  ),
];

export const server = setupServer(...handlers);
