import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { Selector } from "reselect";

import type { AddedState } from "../types/redux";
import type { AppDispatch, RootState } from "./store";

export type TypedCreateSelector<State> = <
  Selectors extends readonly Selector<State>[],
  Result,
>(
  ...args: Parameters<typeof createSelector<Selectors, Result>>
) => ReturnType<typeof createSelector<Selectors, Result>>;

export type AppSelector<
  Result = unknown,
  Params extends readonly Parameters<Selector>[1][] = Parameters<Selector>[1][],
> = Selector<RootState, Result, Params>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppSelector: TypedCreateSelector<RootState> = createSelector;
export const createDraftSafeAppSelector: TypedCreateSelector<AddedState> =
  createDraftSafeSelector;
