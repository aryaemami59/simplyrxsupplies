import { EntitySelectors, EntityState } from "@reduxjs/toolkit";
import type { Selector } from "reselect";

import {
  AppSelector,
  createAppSelector,
  createDraftSafeAppSelector,
} from "../redux/hooks";
import {
  Cart,
  ItemVendors,
  SearchResultsItem,
  SelectorParamsProvider,
  StateAdapters,
} from "./redux";

export type AddedState = {
  readonly searchResults: EntityState<SearchResultsItem, number>;
  readonly cart: EntityState<Cart, number>;
  /**
   * Controls the one to many relationship between an item and its vendors in the search results and the side bar accordion.
   */
  readonly itemVendors: EntityState<ItemVendors, number>;
};

export type AdapterLocalizedSelectors = {
  readonly [K in keyof StateAdapters]: EntitySelectors<
    StateAdapters[K],
    AddedState,
    number
  >;
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

export type DraftSelectorsParametricSelectors = SelectorParamsProvider<
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
