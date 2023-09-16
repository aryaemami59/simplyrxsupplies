import type {
  autotrackMemoize,
  createSelector,
  defaultMemoize,
  EntityAdapter,
  EntitySelectors,
  EntityState,
  OutputSelector,
  Selector,
  weakMapMemoize,
} from "@reduxjs/toolkit";
import type {
  CreateSelectorOptions,
  GetParamsFromSelectors,
  SelectorArray,
  SelectorResultArray,
} from "reselect";

import type {
  createAppSelector,
  createDraftSafeAddedSelector,
} from "../redux/createSelectors";
import type { RootState } from "../redux/store";
import type { Category, Item, Vendor } from "./api";
import type {
  AnyFunction,
  AnyNonNullishValue,
  UnknownFunction,
} from "./tsHelpers";

/**
 * Controls the one to many relationship between an item and its vendors in the search results and the side bar accordion.
 */
export type ItemVendors = {
  /**
   * References itemId.
   */
  readonly id: number;
  readonly checkedVendorIds: number[];
  readonly vendorIds: number[];
};

export type SearchResultsItem = {
  /**
   * References itemId.
   */
  readonly id: number;
};

export type Cart = {
  /**
   * References vendorId.
   */
  readonly id: number;
  readonly itemIds: number[];
};
/** Returned from apiSlice after data transformation. */
export type SuppliesState = {
  readonly items: Item[];
  readonly vendors: Vendor[];
  readonly categories: Category[];
  readonly cart: Cart[];
};

export type ItemIdAndVendorId = {
  readonly itemId: number;
  readonly vendorId: number;
};

type ApiAdapters = {
  readonly items: Item;
  readonly vendors: Vendor;
  readonly categories: Category;
};

/**
 * Controls the one to many relationship between a vendor and its items in a cart.
 */
export type CartItems = {
  /**
   * References vendorId.
   */
  readonly id: number;
  readonly minimizedItemIds: number[];
  readonly itemIds: number[];
};

export type StateAdapters = {
  readonly cart: Cart;
  readonly searchResults: SearchResultsItem;
  /**
   * Controls the one to many relationship between an item and its vendors in the search results and the side bar accordion.
   */
  readonly itemVendors: ItemVendors;
  /**
   * Controls the one to many relationship between a vendor and its items in a cart.
   */
  readonly cartItems: CartItems;
};

export type AdaptersHelper = ApiAdapters & StateAdapters;

export type Adapters = {
  readonly [K in keyof AdaptersHelper]: EntityAdapter<
    AdaptersHelper[K],
    number
  >;
};

export type AdapterSimpleSelectors = {
  readonly [K in keyof AdaptersHelper]: EntitySelectors<
    AdaptersHelper[K],
    EntityState<AdaptersHelper[K], number>,
    number
  >;
};

export type AdaptersInitialStates = {
  readonly [K in keyof AdaptersHelper]: EntityState<AdaptersHelper[K], number>;
};

type SelectorParam = {
  readonly params: readonly unknown[];
  readonly returnType: unknown;
  readonly name: string;
};

export type SelectorParamsProvider<
  State extends object,
  Params extends readonly SelectorParam[],
> = {
  readonly [K in Params[number] as `get${Capitalize<K["name"]>}`]: (
    state: State,
    ...params: K["params"]
  ) => K["returnType"];
};

export type TopLevelSelectorsForAddedState = TopLevelSelectors<
  RootState,
  "added"
>;

export type RootSelectorParamsProvider = SelectorParamsProvider<
  RootState,
  readonly [
    itemId: {
      readonly name: "itemId";
      readonly params: readonly [itemId: number];
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
  readonly [K in keyof AdaptersHelper]: EntitySelectors<
    AdaptersHelper[K],
    RootState,
    number
  >;
};

export type AdapterSelectors = {
  readonly SIMPLE: AdapterSimpleSelectors;
  readonly LOCAL: AdapterLocalizedSelectors;
  readonly GLOBAL: AdapterGlobalizedSelectors;
};

export type AppSelector<
  Result = unknown,
  Params extends readonly unknown[] = unknown[],
> = Selector<RootState, Result, Params>;

export type AddedSliceSelectorParamsProvider = SelectorParamsProvider<
  AddedState,
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
  ]
>;

export type AdapterLocalizedSelectors = {
  readonly [K in keyof StateAdapters]: EntitySelectors<
    StateAdapters[K],
    AddedState,
    number
  >;
};

export type AddedSelector<
  Return = unknown,
  Params extends readonly unknown[] = unknown[],
> = Selector<AddedState, Return, Params>;

export type TopLevelSelectors<
  State extends object,
  P extends keyof State = never,
> = [P] extends [never]
  ? {
      [K in keyof State as `select${Capitalize<
        Extract<K, string>
      >}`]: ReturnType<
        typeof createDraftSafeAddedSelector<
          [AddedSelector<State, never>],
          State[K]
        >
      >;
    }
  : {
      [K in keyof State[P]]: ReturnType<
        typeof createAppSelector<[AppSelector<AddedState, never>], State[P][K]>
      >;
    };

export type AddedState = {
  -readonly [K in keyof StateAdapters]: EntityState<StateAdapters[K], number>;
};

// TODO: potentially remove.
export type TypedCreateSelector<State> = <
  Selectors extends readonly Selector<State>[],
  Result,
>(
  ...args: Parameters<typeof createSelector<Selectors, Result>>
) => ReturnType<typeof createSelector<Selectors, Result>>;

/** Utility type to infer the type of "all params of a function except the first", so we can determine what arguments a memoize function accepts */
export type DropFirst<T extends unknown[]> = T extends [unknown, ...infer U]
  ? U
  : never;
/**
 * Expand an item a single level, or recursively.
 * Source: https://stackoverflow.com/a/69288824/62937
 */
export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? {
      [K in keyof O]: O[K];
    }
  : never;

export type AnyMemoizedSelector = MemoizedSelector<
  Selector[],
  unknown,
  AnyFunction
>;
/** Wrapper around {@link OutputSelector}. Return type of selectors created using `createSelector`. */
export type MemoizedSelector<
  Selectors extends readonly Selector[],
  Result,
  Combiner extends AnyFunction,
  Params extends readonly unknown[] = never,
  Keys = AnyNonNullishValue,
> = OutputSelector<Selectors, Result, Combiner, Params, Keys> & Keys;

// export type ExtendedMemoizedSelector<
//   Selectors extends readonly Selector[],
//   Result,
//   Combiner extends AnyFunction,
//   Params extends readonly unknown[] = never,
//   Keys = AnyNonNullishValue,
// > = OutputSelector<Selectors, Result, Combiner, Params, Keys> & Keys;
/**
 * An instance of createSelector, customized with a given memoize implementation
 * This is a typed version of  `CreateSelectorFunction`.
 */
export type TypedCreateSelectorFunction<
  State,
  MemoizeFunction extends (
    func: (...args: unknown[]) => unknown,
    ...options: never[]
  ) => (...args: unknown[]) => unknown,
  MemoizeOptions extends unknown[] = DropFirst<Parameters<MemoizeFunction>>,
  Keys = Expand<
    Pick<ReturnType<MemoizeFunction>, keyof ReturnType<MemoizeFunction>>
  >,
> = {
  /** Input selectors as separate inline arguments */
  <Selectors extends readonly Selector<State>[], Result>(
    ...items: [
      ...Selectors,
      (...args: SelectorResultArray<Selectors>) => Result,
    ]
  ): OutputSelector<
    Selectors,
    Result,
    (...args: SelectorResultArray<Selectors>) => Result,
    GetParamsFromSelectors<Selectors>,
    Keys
  > &
    Keys;
  /** Input selectors as separate inline arguments with memoizeOptions passed */
  <Selectors extends readonly Selector<State>[], Result>(
    ...items: [
      ...Selectors,
      (...args: SelectorResultArray<Selectors>) => Result,
      CreateSelectorOptions<MemoizeOptions>,
    ]
  ): OutputSelector<
    Selectors,
    Result,
    (...args: SelectorResultArray<Selectors>) => Result,
    GetParamsFromSelectors<Selectors>,
    Keys
  > &
    Keys;
  /** Input selectors as a separate array */
  <Selectors extends readonly Selector<State>[], Result>(
    selectors: [...Selectors],
    combiner: (...args: SelectorResultArray<Selectors>) => Result,
    options?: CreateSelectorOptions<MemoizeOptions>
  ): OutputSelector<
    Selectors,
    Result,
    (...args: SelectorResultArray<Selectors>) => Result,
    GetParamsFromSelectors<Selectors>,
    Keys
  > &
    Keys;
};

export type DefaultMemoize = typeof defaultMemoize;
export type WeakMapMemoize = typeof weakMapMemoize;
export type AutotrackMemoize = typeof autotrackMemoize;

export type Results = {
  readonly name: string;
  readonly time: number;
};

export type SelectorTestResults = {
  readonly results: {
    readonly name: string;
    readonly time: number;
    readonly selector: AnyMemoizedSelector;
  }[];
  readonly fastest: {
    readonly name: string;
    readonly time: number;
    readonly selector: AnyMemoizedSelector;
  };
};

export type ExtendedCreateSelectorFunction<
  MemoizeFunction extends (
    func: UnknownFunction,
    ...options: never[]
  ) => UnknownFunction,
  MemoizeOptions extends unknown[] = DropFirst<Parameters<MemoizeFunction>>,
  Keys = Expand<
    Pick<ReturnType<MemoizeFunction>, keyof ReturnType<MemoizeFunction>>
  > & { readonly memoizeMethod: MemoizeFunction },
> = {
  /** Input selectors as separate inline arguments */
  <Selectors extends SelectorArray, Result>(
    ...items: [
      ...Selectors,
      (...args: SelectorResultArray<Selectors>) => Result,
    ]
  ): OutputSelector<
    Selectors,
    Result,
    (...args: SelectorResultArray<Selectors>) => Result,
    GetParamsFromSelectors<Selectors>,
    Keys
  > &
    Keys;
  /** Input selectors as separate inline arguments with memoizeOptions passed */
  <Selectors extends SelectorArray, Result>(
    ...items: [
      ...Selectors,
      (...args: SelectorResultArray<Selectors>) => Result,
      CreateSelectorOptions<MemoizeOptions>,
    ]
  ): OutputSelector<
    Selectors,
    Result,
    (...args: SelectorResultArray<Selectors>) => Result,
    GetParamsFromSelectors<Selectors>,
    Keys
  > &
    Keys;
  /** Input selectors as a separate array */
  <Selectors extends SelectorArray, Result>(
    selectors: [...Selectors],
    combiner: (...args: SelectorResultArray<Selectors>) => Result,
    options?: CreateSelectorOptions<MemoizeOptions>
  ): OutputSelector<
    Selectors,
    Result,
    (...args: SelectorResultArray<Selectors>) => Result,
    GetParamsFromSelectors<Selectors>,
    Keys
  > &
    Keys;
};

export type TypedExtendedCreateSelectorFunction<
  State,
  MemoizeFunction extends (
    func: (...args: unknown[]) => unknown,
    ...options: never[]
  ) => (...args: unknown[]) => unknown,
  MemoizeOptions extends unknown[] = DropFirst<Parameters<MemoizeFunction>>,
  Keys = Expand<
    Pick<ReturnType<MemoizeFunction>, keyof ReturnType<MemoizeFunction>>
  > & { readonly memoizeMethod: MemoizeFunction },
> = {
  /** Input selectors as separate inline arguments */
  <Selectors extends readonly Selector<State>[], Result>(
    ...items: [
      ...Selectors,
      (...args: SelectorResultArray<Selectors>) => Result,
    ]
  ): OutputSelector<
    Selectors,
    Result,
    (...args: SelectorResultArray<Selectors>) => Result,
    GetParamsFromSelectors<Selectors>,
    Keys
  > &
    Keys;
  /** Input selectors as separate inline arguments with memoizeOptions passed */
  <Selectors extends readonly Selector<State>[], Result>(
    ...items: [
      ...Selectors,
      (...args: SelectorResultArray<Selectors>) => Result,
      CreateSelectorOptions<MemoizeOptions>,
    ]
  ): OutputSelector<
    Selectors,
    Result,
    (...args: SelectorResultArray<Selectors>) => Result,
    GetParamsFromSelectors<Selectors>,
    Keys
  > &
    Keys;
  /** Input selectors as a separate array */
  <Selectors extends readonly Selector<State>[], Result>(
    selectors: [...Selectors],
    combiner: (...args: SelectorResultArray<Selectors>) => Result,
    options?: CreateSelectorOptions<MemoizeOptions>
  ): OutputSelector<
    Selectors,
    Result,
    (...args: SelectorResultArray<Selectors>) => Result,
    GetParamsFromSelectors<Selectors>,
    Keys
  > &
    Keys;
};
