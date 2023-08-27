import { createEntityAdapter } from "@reduxjs/toolkit";

import { CheckedVendors } from "../../types/redux";

const checkedVendorsAdapter = createEntityAdapter<CheckedVendors>();

export default checkedVendorsAdapter;
