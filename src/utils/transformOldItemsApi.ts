import type { Item, OldSupplies, VendorName } from "../types/api";

const transformOldItemsApi = (oldSupplies: OldSupplies): Item[] =>
  oldSupplies.items.map<Item>(oldItem => {
    const newVendors = oldItem.vendors.map<number>(
      (vendorName: VendorName) => oldSupplies.vendors[vendorName].id
    );
    const newCategories = oldItem.category.map<number>(
      categoryName => oldSupplies.categories[categoryName].id
    );
    return { ...oldItem, vendors: newVendors, category: newCategories };
  });

export default transformOldItemsApi;
