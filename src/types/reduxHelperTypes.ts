import type {
  EntityAdapter,
  EntitySelectors,
  EntityState,
} from "@reduxjs/toolkit"
import type {
  Selector,
  unstable_autotrackMemoize as autotrackMemoize,
  lruMemoize,
  weakMapMemoize,
} from "reselect"

import type {
  createAppSelector,
  createDraftSafeAddedSelector,
} from "../redux/createSelectors"
import type { RootState } from "../redux/store"
import type { Category, Item, Vendor } from "./api"

/**
 * Controls the one to many relationship between an item and its vendors in
 * the search results and the side bar accordion.
 */
export type ItemVendors = {
  /**
   * References {@linkcode ItemIdAndVendorId.itemId | itemId}.
   */
  readonly id: number
  /**
   * @default Item.vendorIds
   */
  readonly checkedVendorIds: number[]
  readonly vendorIds: number[]
}

export type SearchResultsItem = {
  /**
   * References {@linkcode ItemIdAndVendorId.itemId | itemId}.
   */
  readonly id: number
}

export type Cart = {
  /**
   * References {@linkcode ItemIdAndVendorId.vendorId | vendorId}.
   */
  readonly id: number
  /**
   * References {@linkcode Cart.itemIds | vendorItemIds}.
   *
   * @default EMPTY_ARRAY
   */
  readonly itemIds: number[]
}
/**
 * Returned from `apiSlice` after data transformation.
 */
export type SuppliesState = {
  readonly items: Item[]
  readonly vendors: Vendor[]
  readonly categories: Category[]
  readonly cart: Cart[]
}

export type ItemIdAndVendorId = {
  readonly itemId: number
  readonly vendorId: number
}

type ApiAdapters = {
  readonly items: Item
  readonly vendors: Vendor
  readonly categories: Category
}

/**
 * Controls the one to many relationship between a vendor and its items in a
 * cart.
 */
export type CartItems = {
  /**
   * References {@linkcode ItemIdAndVendorId.vendorId | vendorId}.
   */
  readonly id: number
  /**
   * @default EMPTY_ARRAY
   */
  readonly minimizedItemIds: number[]
  /**
   * References {@linkcode Cart.itemIds | vendorItemIds}.
   */
  readonly itemIds: number[]
}

export type StateAdapters = {
  readonly cart: Cart
  readonly searchResults: SearchResultsItem
  /**
   * Controls the one to many relationship between an item and its vendors in
   * the search results and the side bar accordion.
   */
  readonly itemVendors: ItemVendors
  /**
   * Controls the one to many relationship between a vendor and its items in a
   * cart.
   */
  readonly cartItems: CartItems
}

export type AdaptersHelper = ApiAdapters & StateAdapters

export type Adapters = {
  readonly [K in keyof AdaptersHelper]: EntityAdapter<AdaptersHelper[K], number>
}

export type AdaptersInitialStates = {
  readonly [K in keyof AdaptersHelper]: EntityState<AdaptersHelper[K], number>
}

type SelectorParam = {
  readonly params: readonly unknown[]
  readonly returnType: unknown
  readonly name: string
}

export type SelectorParamsProvider<
  State extends object,
  Params extends readonly SelectorParam[],
> = {
  readonly [K in Params[number] as `get${Capitalize<K["name"]>}`]: (
    state: State,
    ...params: K["params"]
  ) => K["returnType"]
}

export type TopLevelSelectorsForAddedState = TopLevelSelectors<
  RootState,
  "added"
>

export type RootSelectorParamsProvider = SelectorParamsProvider<
  RootState,
  readonly [
    itemId: {
      readonly name: "itemId"
      readonly params: readonly [itemId: number]
      readonly returnType: number
    },
    cartIdAndItemId: {
      readonly name: "cartIdAndItemId"
      readonly params: readonly [cartId: number, itemId: number]
      readonly returnType: number
    },
    ItemIdAndCartId: {
      readonly name: "ItemIdAndCartId"
      readonly params: readonly [itemId: number, cartId: number]
      readonly returnType: number
    },
  ]
>

export type AdapterGlobalizedSelectors = {
  readonly [K in keyof AdaptersHelper]: EntitySelectors<
    AdaptersHelper[K],
    RootState,
    number
  >
}

export type AdapterSelectors = {
  readonly LOCAL: AdapterLocalizedSelectors
  readonly GLOBAL: AdapterGlobalizedSelectors
}

export type AppSelector<
  Result = unknown,
  Params extends Parameters<Selector> = Parameters<Selector>,
> = Selector<RootState, Result, Params>

export type AddedSliceSelectorParamsProvider = SelectorParamsProvider<
  AddedState,
  readonly [
    itemId: {
      readonly name: "itemId"
      readonly params: readonly [itemId: number]
      readonly returnType: number
    },
    cartId: {
      readonly name: "cartId"
      readonly params: readonly [cartId: number]
      readonly returnType: number
    },
  ]
>

export type AdapterLocalizedSelectors = {
  readonly [K in keyof StateAdapters]: EntitySelectors<
    StateAdapters[K],
    AddedState,
    number
  >
}

export type AddedSelector<
  Return = unknown,
  Params extends readonly unknown[] = unknown[],
> = Selector<AddedState, Return, Params>

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
      >
    }
  : {
      [K in keyof State[P]]: ReturnType<
        typeof createAppSelector<[AppSelector<AddedState, never>], State[P][K]>
      >
    }

export type AddedState = {
  -readonly [K in keyof StateAdapters]: EntityState<StateAdapters[K], number>
}

export type DefaultMemoize = typeof lruMemoize
export type WeakMapMemoize = typeof weakMapMemoize
export type AutotrackMemoize = typeof autotrackMemoize

export type Results = {
  readonly name: string
  readonly time: number
}

export type MappedAdapterSelectors = {
  [K in keyof AdapterGlobalizedSelectors]: {
    [P in keyof AdapterGlobalizedSelectors[K] as `select${Capitalize<K>}${RemoveSelect<
      Extract<P, string>
    >}`]: AdapterGlobalizedSelectors[K][P]
  }
}

export type RemoveSelect<S extends string> = S extends `select${infer P}`
  ? P
  : never
