import "@testing-library/jest-dom/vitest";

import { rest } from "msw";
import { setupServer } from "msw/node";

import API_URL from "../../data/fetchInfo";

export const handlers = [
  rest.get(API_URL, (req, res, ctx) =>
    res(ctx.json("John Smith"), ctx.delay(150))
  ),
];

export const server = setupServer(...handlers);