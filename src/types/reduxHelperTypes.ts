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

/**
 * A single entry in the search results, referencing the matched item by ID.
 */
export type SearchResultsItem = {
  /**
   * References {@linkcode ItemIdAndVendorId.itemId | itemId}.
   */
  readonly id: number
}

/**
 * A single vendor's cart, holding the IDs of the items added for that vendor.
 */
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

/**
 * A payload identifying a specific item within a specific vendor's context.
 */
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

/**
 * The entity types backed by the added-slice state adapters, keyed by
 * collection name.
 */
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

/**
 * The union of {@linkcode ApiAdapters} and {@linkcode StateAdapters} - every
 * entity type managed by an entity adapter, keyed by collection name.
 */
export type AllAdapters = Simplify<ApiAdapters & StateAdapters>

/**
 * Maps each {@linkcode AllAdapters} collection to its
 * {@linkcode EntityAdapter}, keyed by numeric IDs.
 */
export type AllEntityAdapters = {
  readonly [AdapterKey in keyof AllAdapters]: Simplify<
    EntityAdapter<Simplify<AllAdapters[AdapterKey]>, number>
  >
}

/**
 * Maps each {@linkcode AllAdapters} collection to its initial
 * {@linkcode EntityState}.
 */
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

/**
 * Builds the shape of a "params provider" object: for each described selector
 * parameter, a `get<Name>` input selector that reads {@linkcode StateType} and
 * the parameter's arguments and returns its value.
 *
 * @template StateType - The state the input selectors read from.
 * @template SelectorParametersType - The tuple describing each parameter's name, args, and return type.
 */
export type SelectorParamsProvider<
  StateType extends object,
  SelectorParametersType extends readonly SelectorParam[],
> = Simplify<{
  readonly [
    SelectorParameter in SelectorParametersType[number] as `get${Capitalize<SelectorParameter["name"]>}`
  ]: (
    state: StateType,
    ...params: SelectorParameter["params"]
  ) => SelectorParameter["returnType"]
}>

/**
 * The {@linkcode TopLevelSelectors} for the `"added"` slice of the
 * {@linkcode RootState}.
 */
export type TopLevelSelectorsForAddedState = Simplify<
  TopLevelSelectors<RootState, "added">
>

/**
 * The {@linkcode SelectorParamsProvider} for {@linkcode RootState}-based
 * selectors, exposing `getItemId`, `getCartIdAndItemId`, and
 * `getItemIdAndCartId`.
 */
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

/**
 * Maps each {@linkcode AllAdapters} collection to its
 * {@linkcode EntitySelectors} bound to the full {@linkcode RootState}.
 */
export type AdapterGlobalizedSelectors = {
  readonly [AdapterKey in keyof AllAdapters]: Simplify<
    EntitySelectors<AllAdapters[AdapterKey], RootState, number>
  >
}

/**
 * Groups the globalized and localized entity-adapter selectors under
 * {@linkcode AdapterSelectors.GLOBAL | GLOBAL} and
 * {@linkcode AdapterSelectors.LOCAL | LOCAL} keys.
 */
export type AdapterSelectors = {
  readonly GLOBAL: AdapterGlobalizedSelectors
  readonly LOCAL: AdapterLocalizedSelectors
}

/**
 * A {@linkcode Selector} bound to the application's {@linkcode RootState},
 * parameterized by its result and parameter types.
 *
 * @template SelectorResultType - The value the selector returns.
 * @template SelectorParametersType - The selector's parameter tuple.
 */
export type AppSelector<
  SelectorResultType = unknown,
  SelectorParametersType extends Parameters<Selector> = Parameters<Selector>,
> = Selector<RootState, SelectorResultType, SelectorParametersType>

/**
 * The {@linkcode SelectorParamsProvider} for {@linkcode AddedState}-based
 * selectors, exposing `getItemId` and `getCartId`.
 */
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

/**
 * Maps each {@linkcode StateAdapters} collection to its
 * {@linkcode EntitySelectors} bound to the {@linkcode AddedState} slice.
 */
export type AdapterLocalizedSelectors = {
  readonly [StateAdapterKey in keyof StateAdapters]: Simplify<
    EntitySelectors<StateAdapters[StateAdapterKey], AddedState, number>
  >
}

/**
 * A {@linkcode Selector} bound to the {@linkcode AddedState} slice.
 *
 * @template SelectorResultType - The value the selector returns.
 * @template SelectorParametersType - The selector's parameter tuple.
 */
export type AddedSelector<
  SelectorResultType = unknown,
  SelectorParametersType extends readonly unknown[] = unknown[],
> = Selector<AddedState, SelectorResultType, SelectorParametersType>

/**
 * Derives the selector object for a slice of state. With no
 * {@linkcode StateKeyType}, produces a `select<Key>` draft-safe selector for
 * each top-level key; with one, produces a selector for each nested field of
 * that key.
 *
 * @template StateType - The state object to derive selectors for.
 * @template StateKeyType - The optional key to descend into. Defaults to `never`.
 */
export type TopLevelSelectors<
  StateType extends object,
  StateKeyType extends keyof StateType = never,
> = Simplify<
  [StateKeyType] extends [never]
    ? {
        [
          StateKey in keyof StateType as `select${Capitalize<
            Extract<StateKey, string>
          >}`
        ]: ReturnType<
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

/**
 * The shape of the `"added"` slice: each {@linkcode StateAdapters} collection
 * as a normalized {@linkcode EntityState}.
 */
export type AddedState = {
  -readonly [StateAdapterKey in keyof StateAdapters]: Simplify<
    EntityState<Simplify<StateAdapters[StateAdapterKey]>, number>
  >
}

/**
 * The type of Reselect's {@linkcode lruMemoize} for the given function type.
 *
 * @template FunctionType - The function being memoized.
 */
export type DefaultMemoize<FunctionType extends AnyFunction = AnyFunction> =
  typeof lruMemoize<FunctionType>

/**
 * The type of Reselect's {@linkcode weakMapMemoize} for the given function
 * type.
 *
 * @template FunctionType - The function being memoized.
 */
export type WeakMapMemoize<FunctionType extends AnyFunction = AnyFunction> =
  typeof weakMapMemoize<FunctionType>

/**
 * The type of Reselect's {@linkcode autotrackMemoize} for the given function
 * type.
 *
 * @template FunctionType - The function being memoized.
 */
export type AutotrackMemoize<FunctionType extends AnyFunction = AnyFunction> =
  typeof autotrackMemoize<FunctionType>

/**
 * A single benchmark result: a memoize function's name and its measured time
 * in milliseconds.
 */
export type Results = {
  readonly name: string

  readonly time: number
}

/**
 * Flattened form of {@linkcode AdapterGlobalizedSelectors}: each collection's
 * selectors are renamed to embed the collection name (e.g.
 * `selectVendorsById`).
 */
export type MappedAdapterSelectors = Simplify<{
  [AdapterKey in keyof AdapterGlobalizedSelectors]: {
    [
      SelectorKey in keyof AdapterGlobalizedSelectors[AdapterKey] as `select${Capitalize<AdapterKey>}${RemoveSelect<
        Extract<SelectorKey, string>
      >}`
    ]: Simplify<AdapterGlobalizedSelectors[AdapterKey][SelectorKey]>
  }
}>

/**
 * Strips the leading `"select"` prefix from a selector name literal type,
 * resolving to `never` when the name is not so prefixed.
 *
 * @template SelectorNameType - The selector name literal to strip.
 */
export type RemoveSelect<SelectorNameType extends string> =
  SelectorNameType extends `select${infer SelectorNameWithoutSelectPrefix extends string}`
    ? SelectorNameWithoutSelectPrefix
    : never
