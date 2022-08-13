import InputListItems from "./InputListItems";
import React, { memo } from "react";
import PropTypes from "prop-types";
import InputFieldComponent from "./InputFieldComponent";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function InputGroupComponent({ items }) {
  return (
    <div className="row my-5 justify-content-center">
      <div className="col-12 col-md-11 col-lg-11 col-xxl-10">
        <Form.Floating className="" key={"my form floating"}>
          <InputFieldComponent items={items} key={"input field component"} />
          <label
            className="w-auto h-auto ps-4 text-white-50"
            htmlFor="floatingInputCustom"
            key={"my floating label"}>
            Search...
          </label>
          <FontAwesomeIcon
            className=" rounded-circle p-2 position-absolute top-0 end-0 me-1 mt-1 text-white-50"
            role="search"
            size="2x"
            icon={faMagnifyingGlass}
          />
        </Form.Floating>
        <InputListItems />
      </div>
    </div>
  );
}

InputGroupComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
};

export default memo(InputGroupComponent);
