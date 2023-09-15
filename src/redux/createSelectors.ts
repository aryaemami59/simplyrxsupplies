import type { createDraftSafeSelectorCreator } from "@reduxjs/toolkit";
import {
  autotrackMemoize,
  createSelector,
  createSelectorCreator,
  current,
  defaultMemoize,
  isDraft,
  weakMapMemoize,
} from "@reduxjs/toolkit";
import { shallowEqual } from "react-redux";

import type {
  AddedState,
  AutotrackMemoize,
  DefaultMemoize,
  DropFirst,
  TypedCreateSelectorFunction,
  WeakMapMemoize,
} from "../types/reduxHelperTypes";
import type { RootState } from "./store";

// TODO: fix types.
/**
 * Fixed version of {@link createDraftSafeSelectorCreator}
 * @param args - Same arguments as {@link createDraftSafeSelectorCreator}.
 * @returns A `createDraftSafeSelector` function.
 */
export const createDraftSafeSelectorCreatorCorrected: typeof createDraftSafeSelectorCreator =
  <
    F extends (...args: unknown[]) => unknown,
    MemoizeFunction extends (func: F, ...options: unknown[]) => F,
    MemoizeOptions extends unknown[] = DropFirst<Parameters<MemoizeFunction>>,
  >(
    ...args: Parameters<
      typeof createSelectorCreator<F, MemoizeFunction, MemoizeOptions>
    >
  ) => {
    const createSelector2 = createSelectorCreator<
      F,
      MemoizeFunction,
      MemoizeOptions
    >(...args);
    return ((...params: Parameters<typeof createSelector2>) => {
      const selector = createSelector2(...params);
      const wrappedSelector = (state: unknown, ...rest: unknown[]) =>
        selector(isDraft(state) ? current(state) : state, ...rest);
      Object.assign(wrappedSelector, selector);
      return wrappedSelector;
    }) as ReturnType<
      typeof createSelectorCreator<F, MemoizeFunction, MemoizeOptions>
    >;
  };
/** A {@link createSelector} function that takes {@link RootState} as the first argument in its input selectors. */
export const createAppSelector: TypedCreateSelectorFunction<
  RootState,
  DefaultMemoize
> = createSelector;
/** Used to create selectors that are shared across multiple component instances. */
export const createSelectorWeakmap: TypedCreateSelectorFunction<
  RootState,
  WeakMapMemoize
> = createSelectorCreator(weakMapMemoize);
/** Used to create selectors that are used to access nested fields in data. */
export const createSelectorAutotrack: TypedCreateSelectorFunction<
  RootState,
  AutotrackMemoize
> = createSelectorCreator(autotrackMemoize);
export const createDraftSafeAppSelector: TypedCreateSelectorFunction<
  RootState,
  DefaultMemoize
> = createDraftSafeSelectorCreatorCorrected<
  Parameters<DefaultMemoize>[0],
  DefaultMemoize
>(defaultMemoize);
export const createDraftSafSelectorWeakMap =
  createDraftSafeSelectorCreatorCorrected<
    Parameters<WeakMapMemoize>[0],
    WeakMapMemoize
  >(weakMapMemoize);
export const createDraftSafSelectorAutotrack =
  createDraftSafeSelectorCreatorCorrected<
    Parameters<AutotrackMemoize>[0],
    AutotrackMemoize
  >(autotrackMemoize);
export const createDraftSafeAddedSelector: TypedCreateSelectorFunction<
  AddedState,
  DefaultMemoize
> = createDraftSafeSelectorCreatorCorrected(defaultMemoize);
// TODO: remove later.
export const createDebugSelector = createSelectorCreator(defaultMemoize, {
  resultEqualityCheck: (previousVal: unknown, currentVal: unknown) => {
    const isSame = currentVal === previousVal;
    const isShallowEqual = shallowEqual(previousVal, currentVal);
    if (!isSame && isShallowEqual) {
      console.error(
        "Selector param reference changed but value did not\n",
        "\nprevious value:",
        previousVal,
        "\n\ncurrent value:",
        currentVal
      );
    }
    return isSame;
  },
  equalityCheck: (previousVal: unknown, currentVal: unknown) => {
    console.log("selector run");
    const isSame = currentVal === previousVal;
    const isShallowEqual = shallowEqual(previousVal, currentVal);
    if (!isSame && isShallowEqual) {
      console.error(
        "Selector param reference changed but value did not\n",
        "\nprevious value:",
        previousVal,
        "\n\ncurrent value:",
        currentVal
      );
    }
    return isSame;
  },
});

// export const curriedSelector =
//   <Args extends unknown[], SelectorOutput>(
//     selector: AppSelector<SelectorOutput, Args>
//   ) =>
//   (...args: Args) =>
//   (state: RootState) =>
//     selector(state, ...args);

// const uncurry =
//   (curriedFn: AppSelector) =>
//   (...args: unknown[]) =>
//     args.reduce((left, right) => left(right), curriedFn);

// export const createSelectorN = (
//   ...params: ((...args: unknown[]) => unknown)[]
// ) => createSelector(...params, uncurry(params.at(-1)));

export const createAllSelectors = (
  ...args: Parameters<typeof createAppSelector>
) => ({
  default: createAppSelector(...args),
  weakMap: (createSelectorWeakmap as unknown as typeof createAppSelector)(
    ...args
  ),
  autotrack: (createSelectorAutotrack as unknown as typeof createAppSelector)(
    ...args
  ),
});
