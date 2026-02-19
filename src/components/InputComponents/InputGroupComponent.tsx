import { SearchResultsContainer } from "../SearchResultsComponents/SearchResultsContainer.js"
import { InputFieldComponent } from "./InputFieldComponent.js"

export const InputGroupComponent = () => (
  <div className="row justify-content-center">
    <div className="col-12 col-md-11 col-xxl-10 justify-content-center">
      <InputFieldComponent />
      {/* <ExcludeVendors /> */}
      <SearchResultsContainer />
    </div>
  </div>
)
