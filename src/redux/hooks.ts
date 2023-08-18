import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { Selector } from "reselect";
import { createSelector } from "reselect";

import type { AddedState } from "../types/redux";
import type { AppDispatch, RootState } from "./store";

// export type TypedSelector<State> = (
//   ...args: Parameters<Selector<State>>
// ) => ReturnType<Selector<State>>;
// export type TypedSelector<
//   State,
//   Result = unknown,
//   Params extends readonly Parameters<Selector>[1][] = Parameters<Selector>[1][],
// > = Selector<State, Result, Params>;

// export type TypedSelector = Selector;

// export type TypedDraftSafeSelector<
//   State extends RootState[keyof RootState],
//   Result = unknown,
//   Params extends readonly Parameters<Selector>[1][] = Parameters<Selector>[1][],
// > = Selector<State, Result, Params>;

export type TypedCreateSelector<State> = <
  Selectors extends readonly Selector<State>[],
  Result,
>(
  ...args: Parameters<typeof createSelector<Selectors, Result>>
) => ReturnType<typeof createSelector<Selectors, Result>>;

// export type TypedCreateDraftSafeSelector<
//   State extends RootState[keyof RootState],
// > = <Selectors extends readonly Selector<State>[], Result>(
//   ...args: Parameters<typeof createDraftSafeSelector<Selectors, Result>>
// ) => ReturnType<typeof createDraftSafeSelector<Selectors, Result>>;

// export type AddedSelector = TypedSelector<AddedState>;

export type AppSelector<
  Result = unknown,
  Params extends readonly Parameters<Selector>[1][] = Parameters<Selector>[1][],
> = Selector<RootState, Result, Params>;
// export type AppSelector = TypedSelector<RootState>;

// export type CreateAppSelector = <S extends readonly AppSelector[], Result>(
//   ...args: Parameters<typeof createSelector<S, Result>>
// ) => ReturnType<typeof createSelector<S, Result>>;

// type DispatchFunction = () => AppDispatch;
// export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppSelector: TypedCreateSelector<RootState> = createSelector;
export const createDraftSafeAppSelector: TypedCreateSelector<AddedState> =
  createDraftSafeSelector;
// export const createAppSelector: CreateAppSelector = createSelector;
