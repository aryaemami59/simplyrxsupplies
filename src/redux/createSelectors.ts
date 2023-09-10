import {
  autotrackMemoize,
  createSelector,
  createSelectorCreator,
  current,
  defaultMemoize,
  isDraft,
  weakMapMemoize,
} from "@reduxjs/toolkit";

import type {
  AddedState,
  AppSelector,
  TypedCreateSelector,
  TypedWeakMapCreateSelector,
} from "../types/reduxHelperTypes";
import type { RootState } from "./store";
// TODO: fix types.
export const createDraftSafeSelectorCreatorCorrected: typeof createSelectorCreator =
  ((
    ...args: Parameters<typeof createSelectorCreator>
  ): ReturnType<typeof createSelectorCreator> => {
    const createSelector2 = createSelectorCreator(...args);
    return (...params: Parameters<typeof createSelector2>) => {
      const selector = createSelector2(...params);
      const wrappedSelector = (value: unknown, ...rest: unknown[]) =>
        selector(isDraft(value) ? current(value) : value, ...rest);
      Object.assign(wrappedSelector, selector);
      return wrappedSelector;
    };
  }) as typeof createSelectorCreator;

export const createAppSelector: TypedCreateSelector<RootState> = createSelector;
export const createDraftSafeAppSelector: TypedCreateSelector<RootState> =
  createDraftSafeSelectorCreatorCorrected(defaultMemoize);
export const createDraftSafeAddedSelector: TypedCreateSelector<AddedState> =
  createDraftSafeSelectorCreatorCorrected(defaultMemoize);
/** Used to create selectors that are shared across multiple component instances. */
export const createWeakMapSelector: TypedWeakMapCreateSelector<RootState> =
  createSelectorCreator(weakMapMemoize);
/** Used to create selectors that are used to access nested fields in data. */
export const createAutotrackSelector: TypedCreateSelector<RootState> =
  createSelectorCreator(autotrackMemoize);
// TODO: remove later.
export const createDebugSelector = createSelectorCreator(defaultMemoize, {
  equalityCheck: (previousVal: unknown, currentVal: unknown) => {
    const rv = currentVal === previousVal;
    if (!rv) {
      console.log(
        "Selector param value changed\n",
        "\nprevious value:",
        previousVal,
        "\n\ncurrent value:",
        currentVal
      );
    }
    return rv;
  },
});

export const curriedSelector =
  <Args extends unknown[], SelectorOutput>(
    selector: AppSelector<SelectorOutput, Args>
  ) =>
  (...args: Args) =>
  (state: RootState) =>
    selector(state, ...args);

const uncurry =
  (curriedFn: (...params: unknown[]) => unknown) =>
  (...args: unknown[]) =>
    args.reduce((left, right) => left(right), curriedFn);

const createSelectorN = (
  ...selectors: ((...args: unknown[]) => unknown)[],
  curriedFn: (...args: unknown[]) => unknown
) => createSelector(...selectors, uncurry(curriedFn));
