import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { Selector } from "reselect";
import { createSelector } from "reselect";

import type { AppDispatch, RootState } from "./store";

export type AppSelector<
  Result = unknown,
  Params extends readonly Parameters<Selector>[1][] = Parameters<Selector>[1][],
> = Selector<RootState, Result, Params>;

export type CreateAppSelector = <S extends readonly AppSelector[], Result>(
  ...args: Parameters<typeof createSelector<S, Result>>
) => ReturnType<typeof createSelector<S, Result>>;

// type DispatchFunction = () => AppDispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppSelector: CreateAppSelector = createSelector;
