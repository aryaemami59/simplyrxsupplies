import { createEntityAdapter } from "@reduxjs/toolkit";

import { Vendor } from "../../types/api";

const vendorsAdapter = createEntityAdapter<Vendor>();

export default vendorsAdapter;
