import { createEntityAdapter } from "@reduxjs/toolkit";

import { Item } from "../../types/api";

const itemsAdapter = createEntityAdapter<Item>();

export default itemsAdapter;
