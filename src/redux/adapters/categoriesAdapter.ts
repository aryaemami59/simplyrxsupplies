import { createEntityAdapter } from "@reduxjs/toolkit";

import { Category } from "../../types/api";

const categoriesAdapter = createEntityAdapter<Category>();

export default categoriesAdapter;
