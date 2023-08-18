import type { Selector } from "reselect";

import type { SingleItemObject } from "../types/api";
import type { AddedState } from "../types/redux";
import { createDraftSafeAppSelector } from "./hooks";

export const selectItemsObject: Selector<
  AddedState,
  Record<string, SingleItemObject>
> = state => state.itemsObject;

export const selectItem = createDraftSafeAppSelector(
  [selectItemsObject, (added, itemName: string) => itemName],
  (itemsObject, itemName) => itemsObject[itemName]
);

export const selectVendorsToAdd = createDraftSafeAppSelector(
  [selectItem],
  item => item.vendorsToAdd
);

export const selectVendorsAdded = createDraftSafeAppSelector(
  [selectItem],
  item => item.vendorsAdded
);
