import type { OutputSelector } from "@reduxjs/toolkit";
import { createDraftSafeSelectorCreator } from "@reduxjs/toolkit";
import { shallowEqual } from "react-redux";
import type { SelectorArray } from "reselect";
import {
  createSelector,
  createSelectorCreator,
  lruMemoize,
  unstable_autotrackMemoize,
  weakMapMemoize,
} from "reselect";

import { useAppSelector } from "./hooks";
import type { RootState } from "./store";

// export const timeSelector = <T extends AnyFunction>(
//   func: T,
//   ...funcArgs: Parameters<T>
// ) => {
//   const startTime = performance.now();
//   func(...funcArgs);
//   return performance.now() - startTime;
// };

// const memoizeMethods = [lruMemoize, weakMapMemoize, autotrackMemoize] as const

// export type CreateSelectorsMapped = readonly [
//   ExtendedCreateSelectorFunction<DefaultMemoize>,
//   ExtendedCreateSelectorFunction<WeakMapMemoize>,
//   ExtendedCreateSelectorFunction<AutotrackMemoize>,
// ]

// export const createSelectorCreatorWrapper = <
//   MemoizeFunction extends (func: UnknownFunction) => UnknownFunction,
//   MemoizeOptions extends unknown[] = DropFirst<Parameters<MemoizeFunction>>,
// >(
//   ...args: Parameters<
//     typeof createSelectorCreator<
//       Parameters<MemoizeFunction>[0],
//       MemoizeFunction,
//       MemoizeOptions
//     >
//   >
// ): ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions> => {
//   const createSelector2 = createSelectorCreator<
//     Parameters<MemoizeFunction>[0],
//     MemoizeFunction,
//     MemoizeOptions
//   >(...args)
//   return ((
//     ...params: Parameters<
//       ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
//     >
//   ) => {
//     const selector = createSelector2(...params) as ReturnType<
//       ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
//     >
//     Object.assign(selector, { memoize: args[0] })
//     const otherMemoizeMethods = memoizeMethods.filter(
//       ({ name }) => name !== args[0].name
//     )
//     const otherCreateSelectors = otherMemoizeMethods.map(e => {
//       const otherCreateSelector = createSelectorCreator(e)
//       return Object.assign<
//         typeof otherCreateSelector,
//         { readonly memoize: typeof e }
//       >(otherCreateSelector, {
//         memoize: e,
//       })
//     })
//     const otherSelectors = otherCreateSelectors.map(e => {
//       const otherSelector = e(...params)
//       return Object.assign<
//         typeof otherSelector,
//         { readonly memoize: typeof e.memoize }
//       >(otherSelector, { memoize: e.memoize })
//     }) as unknown as ReturnType<
//       ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
//     >[]
//     const wrappedSelector = (
//       ...parameters: Parameters<
//         ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
//       >
//     ) => {
//       const all: ReturnType<
//         ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
//       >[] = []
//       all.push(selector)
//       if (
//         process.env.NODE_ENV === "development" ||
//         process.env.NODE_ENV === "test"
//       ) {
//         selector.dependencies.forEach(e => {
//           if (
//             "memoizeMethod" in e &&
//             typeof e.memoize === "function" &&
//             e.memoize.name === "autotrackMemoize"
//           ) {
//             console.warn(
//               `autotrack memoizers should not be used as dependencies for other memoizers ${e.name}`
//             )
//           }
//         })
//         otherSelectors.forEach(e => {
//           all.push(e)
//         })
//         const leastRecomputatedSelector = all.reduce((prev, curr) =>
//           curr.recomputations() < prev.recomputations() ? curr : prev
//         )
//         if (leastRecomputatedSelector.memoize.name !== args[0].name) {
//           console.warn(
//             `current: ${
//               args[0].name
//             } recomputations: ${selector.recomputations()}\nshould be: ${
//               leastRecomputatedSelector.memoize.name
//             } recomputations: ${leastRecomputatedSelector.recomputations()}`,
//             selector.lastResult(),
//             leastRecomputatedSelector.lastResult(),
//             selector.lastResult() === leastRecomputatedSelector.lastResult()
//           )
//         }
//       }
//       all.forEach(e => {
//         e(...parameters)
//       })
//       return selector.lastResult()
//     }
//     Object.assign(wrappedSelector, selector)
//     return wrappedSelector
//   }) as ExtendedCreateSelectorFunction<MemoizeFunction, MemoizeOptions>
// }

// TODO: fix types.
/**
 * Fixed version of {@link createDraftSafeSelectorCreator}
 * @param args - Same arguments as {@link createDraftSafeSelectorCreator}.
 * @returns A `createDraftSafeSelector` function.
 */
// export const createDraftSafeSelectorCreatorCorrected: typeof createSelectorCreatorWrapper =
//   <
//     MemoizeFunction extends (
//       func: AnyFunction,
//       ...options: unknown[]
//     ) => AnyFunction,
//     MemoizeOptions extends unknown[] = DropFirst<Parameters<MemoizeFunction>>,
//   >(
//     ...args: Parameters<
//       typeof createSelectorCreatorWrapper<MemoizeFunction, MemoizeOptions>
//     >
//   ) => {
//     const createSelector2 = createSelectorCreatorWrapper<
//       MemoizeFunction,
//       MemoizeOptions
//     >(...args)
//     return ((...params: Parameters<typeof createSelector2>) => {
//       const selector = createSelector2(...params)
//       const wrappedSelector = (state: unknown, ...rest: unknown[]) =>
//         selector(isDraft(state) ? current(state) : state, ...rest)
//       Object.assign(wrappedSelector, selector)
//       return wrappedSelector
//     }) as ReturnType<
//       typeof createSelectorCreatorWrapper<MemoizeFunction, MemoizeOptions>
//     >
//   }

/** A {@link createSelector} function that takes {@link RootState} as the first argument in its input selectors. */
// export const createAppSelector = createSelectorCreatorWrapper(defaultMemoize)
export const createAppSelector = createSelectorCreator(lruMemoize);
export const createAutotrackSelector = createSelectorCreator({
  memoize: unstable_autotrackMemoize,
  argsMemoize: unstable_autotrackMemoize,
});
// export const createAppSelector: TypedExtendedCreateSelectorFunction<
//   RootState,
//   DefaultMemoize
// > = createSelectorCreatorWrapper(defaultMemoize);
/** Used to create selectors that are shared across multiple component instances. */
// export const createSelectorWeakMap = createSelectorCreator({
//   memoize: weakMapMemoize,
// })
export const createSelectorWeakMap = createSelector.withTypes<RootState>();
// export const createSelectorWeakMap = createSelectorCreator({
//   memoize: unstable_autotrackMemoize,
//   argsMemoize: unstable_autotrackMemoize,
// })
// export const createSelectorWeakmap =
//   createSelectorCreatorWrapper(weakMapMemoize)
// export const createSelectorWeakmap = createSelectorCreator(weakMapMemoize)
/** Used to create selectors that are used to access nested fields in data. */
// export const createSelectorAutotrack = createSelectorCreator(autotrackMemoize)
// export const createSelectorAutotrack: TypedExtendedCreateSelectorFunction<
//   RootState,
//   AutotrackMemoize
// > = createSelectorCreatorWrapper(autotrackMemoize);

export const createDraftSafeAppSelector =
  createDraftSafeSelectorCreator(lruMemoize);
// export const createDraftSafeAppSelector: TypedExtendedCreateSelectorFunction<
//   RootState,
//   DefaultMemoize
// > = createDraftSafeSelectorCreatorCorrected(defaultMemoize);
export const createDraftSafSelectorWeakMap =
  createDraftSafeSelectorCreator(weakMapMemoize);
// export const createDraftSafSelectorWeakMap: TypedExtendedCreateSelectorFunction<
//   RootState,
//   WeakMapMemoize
// > = createDraftSafeSelectorCreatorCorrected(weakMapMemoize);
// export const createDraftSafSelectorAutotrack =
//   createDraftSafeSelectorCreatorCorrected(autotrackMemoize)
export const createDraftSafeAddedSelector =
  createDraftSafeSelectorCreator(lruMemoize);
// TODO: remove later.
export const createDebugSelector = createSelectorCreator(lruMemoize, {
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

// export interface AllCreateSelectors<
//   Selectors extends readonly AppSelector[],
//   Result,
// > {
//   readonly defaultSelector: ReturnType<
//     typeof createAppSelector<Selectors, Result>
//   >
//   readonly weakMapSelector: ReturnType<
//     typeof createSelectorWeakmap<Selectors, Result>
//   >
//   readonly autotrackSelector: ReturnType<
//     typeof createSelectorAutotrack<Selectors, Result>
//   >
// }

// export const createAllSelectors = <
//   Selectors extends readonly AppSelector[],
//   Result,
// >(
//   ...args: Parameters<typeof createSelectorWeakmap<Selectors, Result>>
// ): AllCreateSelectors<Selectors, Result> => {
//   const defaultSelector = createAppSelector(...args)
//   const weakMapSelector = createSelectorWeakmap(...args)
//   const autotrackSelector = createSelectorAutotrack(...args)
//   setFunctionName(defaultSelector, "defaultSelector")
//   setFunctionName(weakMapSelector, "weakMapSelector")
//   setFunctionName(autotrackSelector, "autotrackSelector")
//   return {
//     defaultSelector,
//     weakMapSelector,
//     autotrackSelector,
//   } as const
// }

// export const createDifferentSelectors = <
//   Selectors extends readonly AppSelector[],
//   Result,
//   Combiner extends AnyFunction,
//   MemoizeFunction extends (
//     func: UnknownFunction,
//     ...options: never[]
//   ) => UnknownFunction,
//   S extends MemoizedSelector<Selectors, Result, Combiner> & {
//     readonly memoizeMethod: MemoizeFunction
//   },
// >(
//   selector: S
// ) => {
//   const args = [
//     selector.dependencies as AppSelector[],
//     selector.resultFunc,
//   ] as const
//   return createAllSelectors(...args)
// }

// export const testSelector = <
//   Selectors extends readonly AppSelector[],
//   Result,
//   Combiner extends AnyFunction,
//   MemoizeFunction extends (
//     func: UnknownFunction,
//     ...options: never[]
//   ) => UnknownFunction,
//   S extends MemoizedSelector<Selectors, Result, Combiner, never[]> & {
//     readonly memoizeMethod: MemoizeFunction;
//   },
//   Args extends Parameters<S>,
// >(
//   memoizedSelector: S,
//   ...selectorArgs: Args
// ) => {
//   const allSelectors = createDifferentSelectors<
//     Selectors,
//     Result,
//     Combiner,
//     MemoizeFunction,
//     S
//   >(memoizedSelector);
//   const results = Object.values(allSelectors).map(selector => {
//     // @ts-expect-error rest argument
//     const time = timeSelector(selector, ...selectorArgs);
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

export const createParametricSelectorHook =
  <Result, Params extends readonly unknown[]>(
    selector: (state: RootState, ...params: Params) => Result
  ) =>
  (...args: Params) =>
    useAppSelector(state => selector(state, ...args));

// export const useCurriedSelector =
//   <Args extends unknown[], SelectorOutput>(
//     selector: AppSelector<SelectorOutput, Args>
//   ) =>
//   (...args: Args) =>
//   (state: RootState) =>
//     selector(state, ...args)

// export const uncurry =
//   (curriedFn: (...args: unknown[]) => UnknownFunction) =>
//   (...args: unknown[]) =>
//     args.reduce((left, right) => left(right), curriedFn);

// export const createSelectorN = (
//   selectors: AppSelector[],
//   curriedFn: (...args: unknown[]) => UnknownFunction
// ) => createSelector(...selectors, uncurry(curriedFn));

export const findFastestSelector = <S extends OutputSelector>(
  selector: S,
  ...selectorArgs: Parameters<S>
) => {
  const memoizeFuncs = [lruMemoize, weakMapMemoize];
  const results = memoizeFuncs
    .map(memoize => {
      const alternateSelector = createSelector(
        [selector.dependencies as [...SelectorArray]],
        selector.resultFunc,
        { memoize }
      );
      const start = performance.now();
      // @ts-expect-error
      // alternateSelector.apply(null, selectorArgs)
      alternateSelector(...selectorArgs);
      const time = performance.now() - start;
      return { name: memoize.name, time, selector: alternateSelector };
      // return { name: memoize.name, time, selector: alternateSelector }
    })
    .sort((a, b) => a.time - b.time);
  const fastest = results.reduce((minResult, currentResult) =>
    currentResult.time < minResult.time ? currentResult : minResult
  );
  const ratios = results
    .filter(({ time }) => time !== fastest.time)
    .map(
      ({ time, name }) =>
        `\x1B[33m \x1B[1m${
          time / fastest.time
        }\x1B[0m times faster than \x1B[1;41m${name}\x1B[0m\n(\x1B[1m\x1B[35m${
          ((time - fastest.time) / time) * 100
        }\x1B[0m% speed increase).`
    );
  if (fastest.selector.memoize.name !== selector.memoize.name) {
    console.warn(
      `The memoization method for \x1B[1;41m${
        selector.name
      }\x1B[0m is \x1B[31m${
        selector.memoize.name
      }\x1B[0m!\nChange it to \x1B[32m\x1B[1m${
        fastest.selector.memoize.name
      }\x1B[0m to be more efficient.\nYou should use \x1B[32m\x1B[1m${
        fastest.name
      }\x1B[0m because it is${ratios.join("\nand\n")}`
    );
  }
  const element = `\x1B[32m\x1B[1m${
    fastest.selector.memoize.name
  }\x1B[0m is\x1B[1m${ratios.join("\nand\n")}\x1B[0m`;
  console.log(element);
  const slowest = Math.min(...results.map(({ time }) => time));
  console.log({ slowest });
  // const rest = results.filter(({ name }) => name !== fastest.name)
  // const info = {
  //   Fastest: fastest.name,
  //   Time: fastest.time,
  //   // fastestRecomputations: fastest.selector.recomputations(),
  //   // slowestRecomputations: slowest.selector.recomputations(),
  // }
  console.log(
    results.map(({ selector }) => ({
      [selector.name]: selector.recomputations(),
    }))
  );
  // console.log(
  //   results.map(({ name, time }) => ({ name, time })),
  //   (fastest.time / slowest) * 100
  // )
  // console.table(results.map(({ name, time }) => ({ name, time })))
  // console.table([{ ...info }, ...rest])
  // console.table({ results, ...fastest })
  return { results, fastest } as const;
};
