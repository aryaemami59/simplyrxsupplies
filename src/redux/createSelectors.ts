import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";

import type {
  AddedState,
  TypedCreateSelector,
} from "../types/reduxHelperTypes";
import type { RootState } from "./store";

export const createAppSelector: TypedCreateSelector<RootState> = createSelector;
export const createDraftSafeAppSelector: TypedCreateSelector<RootState> =
  createDraftSafeSelector;
export const createDraftSafeAddedSelector: TypedCreateSelector<AddedState> =
  createDraftSafeSelector;
