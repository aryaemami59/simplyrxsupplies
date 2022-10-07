import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo } from "react";
import { Form } from "react-bootstrap";
import SearchResultsContainer from "../SearchResultsComponents/SearchResultsContainer";
import InputFieldComponent from "./InputFieldComponent";

const InputGroupComponent: FC = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-11 col-xxl-10 justify-content-center">
          <Form.Floating>
            <InputFieldComponent />
            <label
              className="w-auto h-auto ps-4 text-white-50"
              htmlFor="floatingInputCustom">
              Search...
            </label>
            <FontAwesomeIcon
              className="rounded-circle p-2 position-absolute top-0 end-0 me-1 mt-1 text-white-50"
              role="search"
              size="2x"
              icon={faMagnifyingGlass}
            />
          </Form.Floating>
          <SearchResultsContainer />
        </div>
      </div>
    </>
  );
};

export default memo(InputGroupComponent);
