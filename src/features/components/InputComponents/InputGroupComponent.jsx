import InputListItems from "./InputListItems";
import React, { memo } from "react";
import PropTypes from "prop-types";
import InputFieldComponent from "./InputFieldComponent";
import { Form } from "react-bootstrap";

function InputGroupComponent({ items }) {
  return (
    <div className="row my-5 justify-content-center">
      <div className="col-12 col-md-11 col-lg-11 col-xxl-10">
        <Form.Floating className="" key={"my form floating"}>
          <InputFieldComponent items={items} key={"input field component"} />
          <label
            className="w-auto h-auto ps-4"
            htmlFor="floatingInputCustom"
            key={"my floating label"}>
            Search...
          </label>
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
