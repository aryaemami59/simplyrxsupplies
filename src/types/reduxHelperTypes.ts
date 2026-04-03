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
} from "../redux/createSelectors.js"
import type { RootState } from "../redux/store.js"
import type { Category, Item, Vendor } from "./api.js"
import type { AnyFunction, Simplify } from "./tsHelpers.js"

/**
 * Controls the one to many relationship between an item and its vendors in
 * the search results and the side bar accordion.
 */
export type ItemVendors = {
  /**
   * @default Item.vendorIds
   */
  readonly checkedVendorIds: number[]
  /**
   * References {@linkcode ItemIdAndVendorId.itemId | itemId}.
   */
  readonly id: number
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
  readonly cart: Cart[]
  readonly categories: Category[]
  readonly items: Item[]
  readonly vendors: Vendor[]
}

export type ItemIdAndVendorId = {
  /**
   * References {@linkcode Item.id | itemId}.
   */
  readonly itemId: number
  /**
   * References {@linkcode Vendor.id | vendorId}.
   */
  readonly vendorId: number
}

type ApiAdapters = {
  readonly categories: Category
  readonly items: Item
  readonly vendors: Vendor
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
   * References {@linkcode Cart.itemIds | vendorItemIds}.
   */
  readonly itemIds: number[]
  /**
   * @default EMPTY_ARRAY
   */
  readonly minimizedItemIds: number[]
}

export type StateAdapters = {
  readonly cart: Cart
  /**
   * Controls the one to many relationship between a vendor and its items in a
   * cart.
   */
  readonly cartItems: CartItems
  /**
   * Controls the one to many relationship between an item and its vendors in
   * the search results and the side bar accordion.
   */
  readonly itemVendors: ItemVendors
  readonly searchResults: SearchResultsItem
}

export type AllAdapters = Simplify<ApiAdapters & StateAdapters>

export type AllEntityAdapters = {
  readonly [AdapterKey in keyof AllAdapters]: Simplify<
    EntityAdapter<Simplify<AllAdapters[AdapterKey]>, number>
  >
}

export type AdaptersInitialStates = {
  readonly [AdapterKey in keyof AllAdapters]: Simplify<
    EntityState<Simplify<AllAdapters[AdapterKey]>, number>
  >
}

type SelectorParam = {
  readonly name: string
  readonly params: readonly unknown[]
  readonly returnType: unknown
}

export type SelectorParamsProvider<
  StateType extends object,
  SelectorParametersType extends readonly SelectorParam[],
> = Simplify<{
  readonly [SelectorParameter in SelectorParametersType[number] as `get${Capitalize<SelectorParameter["name"]>}`]: (
    state: StateType,
    ...params: SelectorParameter["params"]
  ) => SelectorParameter["returnType"]
}>

export type TopLevelSelectorsForAddedState = Simplify<
  TopLevelSelectors<RootState, "added">
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
  readonly [AdapterKey in keyof AllAdapters]: Simplify<
    EntitySelectors<AllAdapters[AdapterKey], RootState, number>
  >
}

export type AdapterSelectors = {
  readonly GLOBAL: AdapterGlobalizedSelectors
  readonly LOCAL: AdapterLocalizedSelectors
}

export type AppSelector<
  SelectorResultType = unknown,
  SelectorParametersType extends Parameters<Selector> = Parameters<Selector>,
> = Selector<RootState, SelectorResultType, SelectorParametersType>

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
  readonly [StateAdapterKey in keyof StateAdapters]: Simplify<
    EntitySelectors<StateAdapters[StateAdapterKey], AddedState, number>
  >
}

export type AddedSelector<
  SelectorResultType = unknown,
  SelectorParametersType extends readonly unknown[] = unknown[],
> = Selector<AddedState, SelectorResultType, SelectorParametersType>

export type TopLevelSelectors<
  StateType extends object,
  StateKeyType extends keyof StateType = never,
> = Simplify<
  [StateKeyType] extends [never]
    ? {
        [StateKey in keyof StateType as `select${Capitalize<
          Extract<StateKey, string>
        >}`]: ReturnType<
          typeof createDraftSafeAddedSelector<
            [AddedSelector<StateType, never>],
            StateType[StateKey]
          >
        >
      }
    : {
        [SelectorKey in keyof StateType[StateKeyType]]: ReturnType<
          typeof createAppSelector<
            [AppSelector<AddedState, never>],
            StateType[StateKeyType][SelectorKey]
          >
        >
      }
>

export type AddedState = {
  -readonly [StateAdapterKey in keyof StateAdapters]: Simplify<
    EntityState<Simplify<StateAdapters[StateAdapterKey]>, number>
  >
}

export type DefaultMemoize<FunctionType extends AnyFunction = AnyFunction> =
  typeof lruMemoize<FunctionType>
export type WeakMapMemoize<FunctionType extends AnyFunction = AnyFunction> =
  typeof weakMapMemoize<FunctionType>
export type AutotrackMemoize<FunctionType extends AnyFunction = AnyFunction> =
  typeof autotrackMemoize<FunctionType>

export type Results = {
  readonly name: string
  readonly time: number
}

export type MappedAdapterSelectors = Simplify<{
  [AdapterKey in keyof AdapterGlobalizedSelectors]: {
    [SelectorKey in keyof AdapterGlobalizedSelectors[AdapterKey] as `select${Capitalize<AdapterKey>}${RemoveSelect<
      Extract<SelectorKey, string>
    >}`]: Simplify<AdapterGlobalizedSelectors[AdapterKey][SelectorKey]>
  }
}>

export type RemoveSelect<SelectorNameType extends string> =
  SelectorNameType extends `select${infer SelectorNameWithoutSelectPrefix extends string}`
    ? SelectorNameWithoutSelectPrefix
    : never
