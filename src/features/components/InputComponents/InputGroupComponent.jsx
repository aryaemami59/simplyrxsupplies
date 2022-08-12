import InputListItems from "./InputListItems";
import React, { memo } from "react";
import PropTypes from "prop-types";
import InputFieldComponent from "./InputFieldComponent";
import { InputGroup } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

function InputGroupComponent({ items }) {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-11 col-lg-11 mb-3 col-xxl-10">
        <InputGroup className="mb-4" key="Input Group">
          <FloatingLabel
            className="text-start"
            key="input label"
            controlId="floatingInput"
            label="Search...">
            <InputFieldComponent items={items} />
          </FloatingLabel>
        </InputGroup>
        <InputListItems />
      </div>
      {/* <div className="ps-0 col-md-2"> */}
      {/* <Button
                variant="secondary"
                key="input search button"
                size="lg"
                className="form-control shadow h-100">
                Search
              </Button> */}
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
