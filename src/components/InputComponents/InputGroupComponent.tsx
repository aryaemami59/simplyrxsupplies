import type { FC } from "react";
import { memo } from "react";

import SearchResultsContainer from "../SearchResultsComponents/SearchResultsContainer";
import ExcludeVendors from "./ExcludeVendors";
import InputFieldComponent from "./InputFieldComponent";

const InputGroupComponent: FC = () => (
  <div className="row justify-content-center">
    <div className="col-12 col-md-11 col-xxl-10 justify-content-center">
      <InputFieldComponent />
      <ExcludeVendors />
      <SearchResultsContainer />
    </div>
  </div>
);

export default memo(InputGroupComponent);
