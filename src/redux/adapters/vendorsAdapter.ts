import { createEntityAdapter } from "@reduxjs/toolkit";

import { Vendor } from "../../types/api";

export const vendorsAdapter = createEntityAdapter<Vendor>();

export const initialState = vendorsAdapter.getInitialState();
