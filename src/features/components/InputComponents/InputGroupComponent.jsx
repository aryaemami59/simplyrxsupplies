import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import { memo } from "react";
import InputListItems from "./InputListItems";
import InputFieldComponent from "./InputFieldComponent";
import PropTypes from "prop-types";

function InputGroupComponent() {
  return (
    <div
      key={`div-row-InputGroupComponent`}
      className="row my-5 justify-content-center">
      <div
        key={`div-col-InputGroupComponent`}
        className="col-12 col-md-11 col-lg-11 col-xxl-10">
        <Form.Floating key={`Form.Floating-InputGroupComponent`}>
          <InputFieldComponent
            key={`InputFieldComponent-InputGroupComponent`}
          />
          <label
            className="w-auto h-auto ps-4 text-white-50"
            htmlFor="floatingInputCustom"
            key={`label-InputGroupComponent`}>
            Search...
          </label>
          <FontAwesomeIcon
            key={`FontAwesomeIcon-InputGroupComponent-searchIcon`}
            className=" rounded-circle p-2 position-absolute top-0 end-0 me-1 mt-1 text-white-50"
            role="search"
            size="2x"
            icon={faMagnifyingGlass}
          />
        </Form.Floating>
        <InputListItems key={`InputListItems-InputGroupComponent`} />
      </div>
    </div>
  );
}

InputGroupComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(InputGroupComponent);
