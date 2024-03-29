import { bench, describe } from "vitest";

import { ADAPTER_SELECTORS } from "../../redux/adapterSelectors";
import { addItemToCarts, setSearchResults } from "../../redux/addedSlice";
import { setupWithNoUI, unFreeze } from "../test-utils/testUtils";

describe.todo("addedSlice spec", () => {
  bench("bench", async () => {
    const { store } = await setupWithNoUI();
    store.dispatch(addItemToCarts({ itemId: 0 }));
  });
});

describe.todo("array sorting methods", async () => {
  const { store } = await setupWithNoUI();
  store.dispatch(setSearchResults([...Array.from({ length: 200 }).keys()]));
  const data = ADAPTER_SELECTORS.GLOBAL.searchResults.selectAll(
    store.getState()
  );

  bench(
    "sort immutable",
    () => {
      [...data].sort();
    },
    { iterations: 500 }
  );

  bench(
    "sort mutable",
    () => {
      data.sort();
    },
    { iterations: 500 }
  );
});

describe.todo("object copying methods", async () => {
  const { store } = await setupWithNoUI();
  const state = store.getState();
  bench(
    unFreeze,
    () => {
      unFreeze(state);
    },
    { iterations: 500 }
  );

  bench(
    structuredClone,
    () => {
      structuredClone(state);
    },
    { iterations: 500 }
  );
});

describe("array copying methods", async () => {
  const { store } = await setupWithNoUI();
  const state = store.getState();
  store.dispatch(setSearchResults([...Array.from({ length: 200 }).keys()]));
  const data = ADAPTER_SELECTORS.GLOBAL.searchResults.selectAll(state);
  bench(
    "slice",
    () => {
      const element = data.slice();
    },
    { iterations: 5000 }
  );

  bench(
    "spread",
    () => {
      const element = [...data];
    },
    { iterations: 5000 }
  );
});
