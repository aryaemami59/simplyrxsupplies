import {
  createDraftSafeSelector,
  createSelector,
  EntitySelectors,
} from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { Selector } from "reselect";

import type {
  AddedState,
  Selectors,
  TopLevelSelectors,
} from "../types/AddedState";
import type {
  SelectorParamsProvider,
  StateAndApiAdapters,
} from "../types/redux";
import type { AppDispatch, RootState } from "./store";

type TypedCreateSelector<State> = <
  SelectorsArray extends readonly Selector<State>[],
  Result,
>(
  ...args: Parameters<typeof createSelector<SelectorsArray, Result>>
) => ReturnType<typeof createSelector<SelectorsArray, Result>>;

export type AppSelector<
  Result = unknown,
  Params extends readonly Parameters<Selector>[1][] = Parameters<Selector>[1][],
> = Selector<RootState, Result, Params>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppSelector: TypedCreateSelector<RootState> = createSelector;
export const createDraftSafeRootSelector: TypedCreateSelector<RootState> =
  createDraftSafeSelector;
export const createDraftSafeAppSelector: TypedCreateSelector<AddedState> =
  createDraftSafeSelector;

export type RootSelectorParamsProvider = SelectorParamsProvider<
  RootState,
  readonly [
    itemId: {
      readonly name: "itemId";
      readonly params: readonly [itemId: number];
      readonly returnType: number;
    },
    cartId: {
      readonly name: "cartId";
      readonly params: readonly [cartId: number];
      readonly returnType: number;
    },
    cartIdAndItemId: {
      readonly name: "cartIdAndItemId";
      readonly params: readonly [cartId: number, itemId: number];
      readonly returnType: number;
    },
    ItemIdAndCartId: {
      readonly name: "ItemIdAndCartId";
      readonly params: readonly [itemId: number, cartId: number];
      readonly returnType: number;
    },
  ]
>;

export type AdapterGlobalizedSelectors = {
  readonly [K in keyof StateAndApiAdapters]: EntitySelectors<
    StateAndApiAdapters[K],
    RootState,
    number
  >;
};

export type TopLevelSelectorsForAddedState = TopLevelSelectors<
  RootState,
  "added"
>;

export type SelectorsWithGlobal = Selectors & {
  readonly GLOBAL: AdapterGlobalizedSelectors;
};
