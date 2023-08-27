import cartAdapter from "./adapters/cartAdapter";
import cartItemsAdapter from "./adapters/cartItemsAdapter";
import categoriesAdapter from "./adapters/categoriesAdapter";
import checkedVendorsAdapter from "./adapters/checkedVendorsAdapter";
import itemsAdapter from "./adapters/itemsAdapter";
import searchResultsAdapter, {
  checkedVendorItemsAdapter,
} from "./adapters/searchResultsAdapter";
import vendorsAdapter from "./adapters/vendorsAdapter";

const initialStates = {
  searchResults: searchResultsAdapter.getInitialState(),

  cart: cartAdapter.getInitialState(),

  items: itemsAdapter.getInitialState(),

  vendors: vendorsAdapter.getInitialState(),

  categories: categoriesAdapter.getInitialState(),

  cartItems: cartItemsAdapter.getInitialState(),

  checkedVendors: checkedVendorsAdapter.getInitialState(),

  checkedVendorItems: checkedVendorItemsAdapter.getInitialState(),
};

export default initialStates;
