import type { createDraftSafeSelectorCreator } from "@reduxjs/toolkit";
import {
  autotrackMemoize,
  createSelectorCreator,
  current,
  defaultMemoize,
  isDraft,
  weakMapMemoize,
} from "@reduxjs/toolkit";
import { shallowEqual } from "react-redux";

import type {
  AddedState,
  AppSelector,
  AutotrackMemoize,
  DefaultMemoize,
  DropFirst,
  ExtendedCreateSelectorFunction,
  MemoizedSelector,
  TypedCreateSelectorFunction,
  TypedExtendedCreateSelectorFunction,
  WeakMapMemoize,
} from "../types/reduxHelperTypes";
import type { AnyFunction, UnknownFunction } from "../types/tsHelpers";
import setFunctionName from "../utils/setFunctionName";
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

const memoizeMethods = [
  defaultMemoize,
  weakMapMemoize,
  // autotrackMemoize,
] as const;

export type CreateSelectorsMapped = readonly [
  ExtendedCreateSelectorFunction<DefaultMemoize>,
  ExtendedCreateSelectorFunction<WeakMapMemoize>,
  ExtendedCreateSelectorFunction<AutotrackMemoize>,
];

// export type CreateSelectorsMapped = {
//   [K in keyof typeof memoizeMethods]: ExtendedCreateSelectorFunction<
//     (typeof memoizeMethods)[K]
//   >;
// };

export const createSelectorCreatorWrapper = <
  MemoizeFunction extends (func: UnknownFunction) => UnknownFunction,
  MemoizeOptions extends unknown[] = DropFirst<Parameters<MemoizeFunction>>,
>(
  ...args: Parameters<
    typeof createSelectorCreator<
      Parameters<MemoizeFunction>[0],
      MemoizeFunction,
      MemoizeOptions
    >
  >
): ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions> => {
  const createSelector2 = createSelectorCreator<
    Parameters<MemoizeFunction>[0],
    MemoizeFunction,
    MemoizeOptions
  >(...args);
  return ((
    ...params: Parameters<
      ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
    >
  ) => {
    const selector = createSelector2(...params) as ReturnType<
      ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
    >;
    Object.assign(selector, { memoizeMethod: args[0] });
    const otherMemoizeMethods = memoizeMethods.filter(
      e => e.name !== args[0].name
    );
    const otherCreateSelectors = otherMemoizeMethods.map(e => {
      const otherCreateSelector = createSelectorCreator(e);
      return Object.assign<
        typeof otherCreateSelector,
        { readonly memoizeMethod: typeof e }
      >(otherCreateSelector, {
        memoizeMethod: e,
      });
      // return otherCreateSelector;
    });
    const otherSelectors = otherCreateSelectors.map(e => {
      const otherSelector = e(...(params as Parameters<typeof e>));
      return Object.assign<
        typeof otherSelector,
        { readonly memoizeMethod: typeof e.memoizeMethod }
      >(otherSelector, { memoizeMethod: e.memoizeMethod });
    }) as unknown as ReturnType<
      ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
    >[];
    const wrappedSelector = (
      ...parameters: Parameters<
        ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
      >
    ) => {
      const all: ReturnType<
        ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
      >[] = [];
      const mainResults = selector(...parameters);
      all.push(selector);
      otherSelectors.forEach(e => {
        const res = e(...parameters);
        if (
          e.memoizeMethod.name === "autotrackMemoize" &&
          typeof res === "object"
        ) {
          if (Array.isArray(res)) {
            // console.log(res, JSON.stringify(res), res[0]);
          } else {
            console.log(...parameters);
            // const element = Object.assign({}, res)
            // console.log(element)
            console.dir(e.lastResult());
            console.log(res.ids);
            // console.dir(Object.entries(res));
          }
        }
      });
      // console.log(selector.recomputations());
      otherSelectors.forEach(e => {
        // console.log(e.memoizeMethod.name, e.recomputations());
        all.push(e);
      });
      const leastRecomputatedSelector = all.reduce((prev, curr) =>
        curr.recomputations() < prev.recomputations() ? curr : prev
      );
      const areAllResultsTheSame = all.every(e => {
        // console.log(e.lastResult());
        // if (e.memoizeMethod.name === "autotrackMemoize") {
        //   console.log(e.lastResult);
        // }
        return shallowEqual(
          e.memoizeMethod.name === "autotrackMemoize"
            ? JSON.parse(JSON.stringify(e.lastResult()))
            : e.lastResult(),
          selector.lastResult()
        );
      });
      // console.log(
      //   leastRecomputatedSelector.memoizeMethod.name,
      //   leastRecomputatedSelector.recomputations(),
      //   leastRecomputatedSelector.lastResult(),
      //   args[0].name,
      //   selector.recomputations(),
      //   selector.lastResult()
      // );
      if (leastRecomputatedSelector.memoizeMethod.name !== args[0].name) {
        if (!areAllResultsTheSame) {
          console.error("RESULTS ARE NOT THE SAME!");
        }
        console.warn(
          `current: ${args[0].name}\nshould be: ${leastRecomputatedSelector.memoizeMethod.name}`
        );
      }
      return mainResults;
    };
    Object.assign(wrappedSelector, selector);
    return wrappedSelector;
  }) as ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>;
};

/** A {@link createSelector} function that takes {@link RootState} as the first argument in its input selectors. */
export const createAppSelector: TypedExtendedCreateSelectorFunction<
  RootState,
  DefaultMemoize
> = createSelectorCreatorWrapper(defaultMemoize);
/** Used to create selectors that are shared across multiple component instances. */
export const createSelectorWeakmap: TypedExtendedCreateSelectorFunction<
  RootState,
  WeakMapMemoize
> = createSelectorCreatorWrapper(weakMapMemoize);

// console.log(createSelectorWeakmap.memoizeMethod.name);
/** Used to create selectors that are used to access nested fields in data. */
export const createSelectorAutotrack: TypedExtendedCreateSelectorFunction<
  RootState,
  AutotrackMemoize
> = createSelectorCreatorWrapper(autotrackMemoize);
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

// const loggedMethod = (originalMethod: any, _context: any) => {
//   return (this: any, ...args: any[]) => {
//     console.log("LOG: Entering method.");
//     const result = originalMethod.call(this, ...args);
//     console.log("LOG: Exiting method.");
//     return result;
//   };
// };

export type AllCreateSelectors<
  Selectors extends readonly AppSelector[],
  Result,
> = {
  readonly defaultSelector: ReturnType<
    typeof createAppSelector<Selectors, Result>
  >;
  readonly weakMapSelector: ReturnType<
    typeof createSelectorWeakmap<Selectors, Result>
  >;
  readonly autotrackSelector: ReturnType<
    typeof createSelectorAutotrack<Selectors, Result>
  >;
};

export const createAllSelectors = <
  Selectors extends readonly AppSelector[],
  Result,
>(
  ...args: Parameters<typeof createSelectorWeakmap<Selectors, Result>>
): AllCreateSelectors<Selectors, Result> => {
  const defaultSelector = createAppSelector(...args);
  const weakMapSelector = createSelectorWeakmap(...args);
  const autotrackSelector = createSelectorAutotrack(...args);
  setFunctionName(defaultSelector, "defaultSelector");
  setFunctionName(weakMapSelector, "weakMapSelector");
  setFunctionName(autotrackSelector, "autotrackSelector");
  return {
    defaultSelector,
    weakMapSelector,
    autotrackSelector,
  } as const;
};

// export const callAllSelectors = <Args extends unknown[]>(
//   selectors: AllCreateSelectors,
//   ...selectorArgs: Args
// ) => {
//   const array: { name: string; time: number }[] = [];
//   Object.values(selectors).forEach(
//     (selector: ReturnType<typeof createSelectorWeakmap<Args>>) => {
//       const startTime = performance.now();
//       Array.from<number>({ length: 100 })
//         .fill(99)
//         .forEach(a => {
//           selector(...selectorArgs);
//         });
//       const endTime = performance.now();
//       console.log(endTime - startTime);
//       array.push({ name: selector.name, time: endTime - startTime });
//       console.log(selector.name);
//       console.log(selector.recomputations());
//       selector.resetRecomputations();
//     }
//   );
//   console.log(
//     "fastest:",
//     array.find(e => e.time === Math.min(...array.map(e => e.time)))
//   );
// };

export const createDifferentSelectors = <
  Selectors extends readonly AppSelector[],
  Result,
  Combiner extends AnyFunction,
  MemoizeFunction extends (
    func: UnknownFunction,
    ...options: never[]
  ) => UnknownFunction,
  S extends MemoizedSelector<Selectors, Result, Combiner> & {
    readonly memoizeMethod: MemoizeFunction;
  },
>(
  selector: S
) => {
  const args = [
    selector.dependencies as AppSelector[],
    selector.resultFunc,
  ] as const;
  return createAllSelectors(...args);
};

export const timeSelector = <T extends AnyFunction>(
  func: T,
  ...funcArgs: Parameters<T>
) => {
  const startTime = performance.now();
  func(...funcArgs);
  return performance.now() - startTime;
};

// export const testSelector = <
//   S extends AnyMemoizedSelector,
//   Args extends Parameters<S> = any[],
// >(
//   memoizedSelector: S,
//   ...selectorArgs: Args
// ) => {
//   const allSelectors = createDifferentSelectors(memoizedSelector);
//   const results = Object.values(allSelectors).map(selector => {
//     // selector.clearCache();
//     // selector.resetRecomputations();
//     // @ts-expect-error rest argument
//     const time = timeSelector(selector, ...selectorArgs);
//     console.log(selector.name, selector.recomputations());
//     // const startTime = performance.now();
//     // const time = performance.now() - startTime;
//     // selector.clearCache();
//     // selector.resetRecomputations();
//     return { name: selector.name, time, selector };
//   });
//   const fastest = results.reduce((minResult, currentResult) =>
//     currentResult.time < minResult.time ? currentResult : minResult
//   );
//   const ratios = results
//     .filter(({ time }) => time !== fastest.time)
//     .map(
//       ({ time, name }) => `${time / fastest.time} times faster than ${name}`
//     );
//   if (
//     fastest.selector.memoizeMethod.name !== memoizedSelector.memoizeMethod.name
//   ) {
//     console.warn(
//       `The memoization method for \x1B[1;41m${
//         memoizedSelector.name
//       }\x1B[0m is \x1B[31m${
//         memoizedSelector.memoizeMethod.name
//       }\x1B[0m!\nChange it to ${
//         fastest.selector.memoizeMethod.name
//       } to be more efficient.\nYou should use ${
//         fastest.name
//       } because it is ${ratios.join("\nand\n")}`
//     );
//   }
//   return { results, fastest } as const;
// };
export const testSelector = <
  Selectors extends readonly AppSelector[],
  Result,
  Combiner extends AnyFunction,
  MemoizeFunction extends (
    func: UnknownFunction,
    ...options: never[]
  ) => UnknownFunction,
  S extends MemoizedSelector<Selectors, Result, Combiner, never[]> & {
    readonly memoizeMethod: MemoizeFunction;
  },
  Args extends Parameters<S>,
>(
  memoizedSelector: S,
  ...selectorArgs: Args
) => {
  const allSelectors = createDifferentSelectors<
    Selectors,
    Result,
    Combiner,
    MemoizeFunction,
    S
  >(memoizedSelector);
  const results = Object.values(allSelectors).map(selector => {
    // selector.clearCache();
    // selector.resetRecomputations();
    // @ts-expect-error rest argument
    const time = timeSelector(selector, ...selectorArgs);
    console.log(selector.name, selector.recomputations());
    // const startTime = performance.now();
    // const time = performance.now() - startTime;
    // selector.clearCache();
    // selector.resetRecomputations();
    return { name: selector.name, time, selector };
  });
  const fastest = results.reduce((minResult, currentResult) =>
    currentResult.time < minResult.time ? currentResult : minResult
  );
  const ratios = results
    .filter(({ time }) => time !== fastest.time)
    .map(
      ({ time, name }) => `${time / fastest.time} times faster than ${name}`
    );
  if (
    fastest.selector.memoizeMethod.name !== memoizedSelector.memoizeMethod.name
  ) {
    console.warn(
      `The memoization method for \x1B[1;41m${
        memoizedSelector.name
      }\x1B[0m is \x1B[31m${
        memoizedSelector.memoizeMethod.name
      }\x1B[0m!\nChange it to ${
        fastest.selector.memoizeMethod.name
      } to be more efficient.\nYou should use ${
        fastest.name
      } because it is ${ratios.join("\nand\n")}`
    );
  }
  return { results, fastest } as const;
};
