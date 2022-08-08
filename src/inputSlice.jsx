// import { createSlice } from "@reduxjs/toolkit";
// import { shallowEqual } from "react-redux";
// import { createSelector } from "reselect";

// const empty = [];

// const initialState = {
//   listItems: empty,
// };

// export const inputSlice = createSlice({
//   name: "input",
//   initialState,
//   reducers: {
//     setListItems: (state, action) => {
//       state.listItems = action.payload;
//     },
//     removeListItems: (state, action) => {
//       state.listItems = state.listItems.filter(
//         ({ name }) => name !== action.payload.name
//       );
//     },
//   },
// });

// export const selectAllListItems = createSelector(
//   state => state.input.listItems,
//   listItems => listItems
// );

// export const { setListItems, removeListItems } = inputSlice.actions;

// export const inputReducer = inputSlice.reducer;
