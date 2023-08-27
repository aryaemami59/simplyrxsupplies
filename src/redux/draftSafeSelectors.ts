import type { Selector } from "reselect";

import type { AddedState } from "../types/redux";
import difference from "../utils/difference";
import cartAdapter from "./adapters/cartAdapter";
import cartItemsAdapter from "./adapters/cartItemsAdapter";
import categoriesAdapter from "./adapters/categoriesAdapter";
import checkedVendorsAdapter from "./adapters/checkedVendorsAdapter";
import itemsAdapter from "./adapters/itemsAdapter";
import searchResultsAdapter, {
  checkedVendorItemsAdapter,
} from "./adapters/searchResultsAdapter";
import vendorsAdapter from "./adapters/vendorsAdapter";
import {
  AppSelector,
  createAppSelector,
  createDraftSafeAppSelector,
} from "./hooks";
import initialStates from "./initialStates";

// const selectSelf: Selector<AddedState, AddedState, never> = (
//   state: AddedState
// ) => state;

export const localizedSelectors = {
  searchResults: searchResultsAdapter.getSelectors<AddedState>(
    added => added.searchResults
  ),

  cart: cartAdapter.getSelectors<AddedState>(added => added.cart),

  // items: itemsAdapter.getSelectors<AddedState>(added => added.items),

  // vendors: vendorsAdapter.getSelectors<AddedState>(added => added.vendors),

  // categories: categoriesAdapter.getSelectors<AddedState>(
  //   added => added.categories
  // ),

  checkedVendorItems: checkedVendorItemsAdapter.getSelectors<AddedState>(
    added => added.checkedVendorItems
  ),
};

export const simpleSelectors = {
  searchResults: searchResultsAdapter.getSelectors(),

  cart: cartAdapter.getSelectors(),

  items: itemsAdapter.getSelectors(),

  vendors: vendorsAdapter.getSelectors(),

  categories: categoriesAdapter.getSelectors(),

  cartItems: cartItemsAdapter.getSelectors(),

  checkedVendors: checkedVendorsAdapter.getSelectors(),

  checkedVendorItems: checkedVendorItemsAdapter.getSelectors(),
};

type AddedSelector<
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
        typeof createDraftSafeAppSelector<
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

export type ParametricSelectors<
  State extends object,
  Params extends readonly {
    readonly params: readonly unknown[];
    readonly returnType: unknown;
    readonly name: string;
  }[],
> = {
  readonly [K in Params[number] as `get${Capitalize<K["name"]>}`]: (
    state: State,
    ...params: K["params"]
  ) => K["returnType"];
};

type DraftSelectorsParametricSelectors = ParametricSelectors<
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

const parametricSelectors = {
  getItemId: (added, itemId) => itemId,
  getCartId: (added, cartId) => cartId,
  getCartIdAndItemId: (added, cartId, itemId) => itemId,
  getItemIdAndCartId: (added, itemId, cartId) => cartId,
} as const satisfies DraftSelectorsParametricSelectors;

// const topLevelDraftSafeSelectors: TopLevelSelectors<AddedState> = {
//   selectCategories: createDraftSafeAppSelector(
//     [selectSelf],
//     added => added.categories
//   ),
//   selectItems: createDraftSafeAppSelector([selectSelf], added => added.items),
//   selectSearchResults: createDraftSafeAppSelector(
//     [selectSelf],
//     added => added.searchResults
//   ),
//   selectVendors: createDraftSafeAppSelector(
//     [selectSelf],
//     added => added.vendors
//   ),
//   selectCart: createDraftSafeAppSelector([selectSelf], added => added.cart),
// } as const;

class DraftSafeSelectors {
  public readonly selectCartItems = createDraftSafeAppSelector(
    [localizedSelectors.cart.selectById],
    cart => (cart ? cart.items : initialStates.cartItems)
  );

  public readonly selectAllCartItems = createDraftSafeAppSelector(
    [this.selectCartItems],
    simpleSelectors.cartItems.selectAll
  );

  public readonly selectUnCheckedVendorIds = createDraftSafeAppSelector(
    [
      localizedSelectors.checkedVendorItems.selectAll,
      parametricSelectors.getCartId,
    ],
    (checkedVendorItems, cartId) =>
      checkedVendorItems.filter(({ checkedVendors, vendors }) =>
        difference(vendors, checkedVendors).includes(cartId)
      )
    // .filter(
    //   ({ checkedVendors }) => !checkedVendors.entities[cartId]?.checked
    // )
  );

  public readonly selectSearchResultsByVendorId = createDraftSafeAppSelector(
    [
      localizedSelectors.checkedVendorItems.selectAll,
      parametricSelectors.getCartId,
    ],
    (checkedVendorItems, cartId) =>
      checkedVendorItems.filter(({ checkedVendors }) =>
        checkedVendors.includes(cartId)
      )
  );
}

export const draftSafeSelectors = new DraftSafeSelectors();
