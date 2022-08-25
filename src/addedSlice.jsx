import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { GITHUB_URL_ITEMS, GITHUB_URL_VENDORS, GITHUB_URL_NAVLIST, } from "./data/fetchInfo";
const intersection = (firstArray, secondArray) => firstArray.filter((e) => !secondArray.includes(e));
const createAsyncThunkFunc = (strVal, githubUrl) => {
    return createAsyncThunk(`${strVal}/fetch${strVal}`, async () => {
        const response = await fetch(githubUrl);
        if (!response.ok) {
            return Promise.reject("Unable to fetch, status: " + response.status);
        }
        const data = await response.json();
        const myItems = await data[strVal];
        return myItems;
    });
};
export const fetchItems = createAsyncThunkFunc("items", GITHUB_URL_ITEMS);
// console.log(fetchItems);
console.log(fetchItems.pending.type);
export const fetchVendors = createAsyncThunkFunc("vendors", GITHUB_URL_VENDORS);
export const fetchNavList = createAsyncThunkFunc("navs", GITHUB_URL_NAVLIST);
const empty = [];
const initialState = {
    listItems: empty,
    compact: false,
    showItemNumber: true,
    showItemBarcode: true,
    showItemName: true,
    vendorsIsLoading: true,
    navListIsLoading: true,
    errMsg: "",
};
const itemInitialState = {
    itemsArr: empty,
    isLoading: true,
    errMsg: "",
};
export const addedSlice = createSlice({
    name: "added",
    initialState,
    reducers: {
        addItems: (state, action) => {
            action.payload.vendors.forEach((e) => {
                if (!current(state[e]).includes(action.payload.itemObj)) {
                    state[e].push(action.payload.itemObj);
                    state.listItems = state.listItems.filter(({ name }) => name !== action.payload.itemObj.name);
                }
            });
        },
        addItemsByVendor: (state, action) => {
            state[action.payload.vendorName].push(action.payload.itemObj);
        },
        removeItems: (state, action) => {
            state[action.payload.vendorName] = state[action.payload.vendorName].filter(({ name }) => name !== action.payload.itemObj.name);
        },
        setListItems: (state, action) => {
            // console.log("was".match(/\s*(was)/gi));
            console.log(/\s*(relion)*\s*(syringes)*/gi.test("relion insulin syringes"));
            // console.log(action.payload.split(/\s+/));
            state.listItems = action.payload;
        },
        clearListItems: (state) => {
            state.listItems = empty;
        },
        compactSearchResults: (state) => {
            state.compact = !state.compact;
        },
        ToggleItemNumber: (state) => {
            state.showItemNumber = !state.showItemNumber;
        },
        ToggleItemBarcode: (state) => {
            state.showItemBarcode = !state.showItemBarcode;
        },
        ToggleItemName: (state) => {
            state.showItemName = !state.showItemName;
        },
    },
    extraReducers: {
        [fetchVendors.pending.type]: (state) => {
            state.vendorsIsLoading = true;
        },
        [fetchNavList.pending.type]: (state) => {
            state.navListIsLoading = true;
        },
        [fetchNavList.fulfilled.type]: (state, action) => {
            state.navsObj = action.payload;
            state.navsArr = Object.keys(action.payload);
            state.navListIsLoading = false;
            state.errMsg = "";
        },
        [fetchVendors.fulfilled.type]: (state, action) => {
            state.vendorsArr = Object.keys(action.payload);
            state.vendorsObj = action.payload;
            for (const val in action.payload) {
                state[val] = empty;
            }
            state.vendorsIsLoading = false;
            state.errMsg = "";
        },
        [fetchVendors.rejected.type]: (state, action) => {
            state.vendorsIsLoading = false;
            state.errMsg = action.error ? action.error.message : "Fetch failed";
        },
        [fetchNavList.rejected.type]: (state, action) => {
            state.navListIsLoading = false;
            state.errMsg = action.error ? action.error.message : "Fetch failed";
        },
    },
});
export const itemSlice = createSlice({
    name: "item",
    initialState: itemInitialState,
    reducers: {
        setVendors: (state, action) => {
            console.log(action.payload);
            state[action.payload.itemObj.name].vendorsToAdd = state[action.payload.itemObj.name].vendorsToAdd.includes(action.payload.vendorName)
                ? state[action.payload.itemObj.name].vendorsToAdd.filter((e) => e !== action.payload.vendorName)
                : state[action.payload.itemObj.name].vendorsToAdd.concat(action.payload.vendorName);
        },
    },
    extraReducers: {
        [fetchItems.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchItems.fulfilled.type]: (state, action) => {
            for (const key of action.payload) {
                state[key.name] = { vendorsToAdd: key.vendors, vendorsAdded: empty };
            }
            state.isLoading = false;
            state.errMsg = "";
            state.itemsArr = action.payload;
        },
        [fetchItems.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : "Fetch failed";
        },
        "added/addItems": (state, action) => {
            state[action.payload.itemObj.name].vendorsAdded = [
                ...state[action.payload.itemObj.name].vendorsAdded,
                ...state[action.payload.itemObj.name].vendorsToAdd,
            ];
            state[action.payload.itemObj.name].vendorsToAdd = state[action.payload.itemObj.name].vendorsToAdd.length
                ? intersection(action.payload.itemObj.vendors, state[action.payload.itemObj.name].vendorsAdded)
                : empty;
        },
        "added/addItemsByVendor": (state, action) => {
            state[action.payload.itemObj.name].vendorsAdded = [
                ...state[action.payload.itemObj.name].vendorsAdded,
                action.payload.vendorName,
            ];
            state[action.payload.itemObj.name].vendorsToAdd = state[action.payload.itemObj.name].vendorsToAdd.length
                ? intersection(action.payload.itemObj.vendors, state[action.payload.itemObj.name].vendorsAdded)
                : empty;
        },
        "added/removeItems": (state, action) => {
            state[action.payload.itemObj.name].vendorsAdded = state[action.payload.itemObj.name].vendorsAdded.filter((e) => e !== action.payload.vendorName);
        },
    },
});
export const selectByVendor = (vendorName) => (state) => state.added[vendorName];
export const selectVendorsArr = (state) => state.added.vendorsArr ? state.added.vendorsArr : empty;
export const selectVendorsLinks = (vendorName) => (state) => state.added.vendorsObj ? state.added.vendorsObj[vendorName].link : "";
export const selectNavsArr = (state) => state.added.navsArr ? state.added.navsArr : empty;
export const addedItemsLength = (vendorName) => (state) => state.added[vendorName].length;
export const checkIfAddedToOneVendor = (itemObj, vendorName) => (state) => state.item[itemObj.name].vendorsAdded.includes(vendorName);
export const selectItemsByVendor = (vendorName) => (state) => state.added.vendorsObj ? state.added.vendorsObj[vendorName].items : empty;
export const selectVendorsToAddTo = (itemObj) => (state) => state.item[itemObj.name].vendorsToAdd;
export const selectSidebarNavs = (category) => (state) => state.added.navsObj ? state.added.navsObj[category] : empty;
export const selectQRCodeContent = (vendorName) => (state) => state.added[vendorName]
    .map(({ itemNumber }) => itemNumber)
    .join(state.added.vendorsObj?.[vendorName].joinChars);
export const checkIfAddedToAllVendors = (itemObj) => (state) => state.item[itemObj.name].vendorsAdded.length === itemObj.vendors.length;
export const checkIfItemAddedToOneVendor = (vendorName, itemObj) => (state) => state.item[itemObj.name].vendorsAdded.includes(vendorName);
export const selectItemsArr = (state) => state.item.itemsArr;
export const selectVendorOfficialName = (vendorName) => (state) => state.added.vendorsObj
    ? state.added.vendorsObj[vendorName].officialName
    : "";
export const selectAllVendorOfficialNames = (state) => state.added.vendorsArr
    ? state.added.vendorsArr.map((e) => state.added.vendorsObj ? state.added.vendorsObj[e].officialName : "")
    : empty;
export const selectAllListItems = createSelector((state) => state.added.listItems, (listItems) => listItems);
export const checkIfLoading = (state) => state.item.isLoading ||
    state.added.vendorsIsLoading ||
    state.added.navListIsLoading;
export const selectErrMsg = (state) => state.item.errMsg || state.added.errMsg;
export const { addItems, removeItems, addItemsByVendor, setListItems, clearListItems, compactSearchResults, ToggleItemNumber, ToggleItemBarcode, ToggleItemName, } = addedSlice.actions;
export const { setVendors } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
export const addedReducer = addedSlice.reducer;
