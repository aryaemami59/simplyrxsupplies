import cartAdapter from "./adapters/cartAdapter";
import cartItemsAdapter from "./adapters/cartItemsAdapter";
import categoriesAdapter from "./adapters/categoriesAdapter";
import itemsAdapter from "./adapters/itemsAdapter";
import searchResultsAdapter from "./adapters/searchResultsAdapter";
import vendorsAdapter from "./adapters/vendorsAdapter";

const initialStates = {
  searchResults: searchResultsAdapter.getInitialState(),

  cart: cartAdapter.getInitialState(),

  items: itemsAdapter.getInitialState(),

  vendors: vendorsAdapter.getInitialState(),

  categories: categoriesAdapter.getInitialState(),

  cartItems: cartItemsAdapter.getInitialState(),
};

export default initialStates;
