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
    <>
      {/* <FloatingLabel
        controlId="floatingInput1"
        label="Email address"
        className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel> */}
      <div>
        <div className="row">
          <InputGroup className="my-4" key="Input Group">
            <div className="p-0 col-md-10">
              <FloatingLabel
                className="text-start"
                key="input label"
                controlId="floatingInput"
                label="Search...">
                <InputFieldComponent items={items} />
              </FloatingLabel>
            </div>
            <div className="ps-0 col-md-2">
              <Button
                variant="secondary"
                key="input search button"
                size="lg"
                className="form-control shadow h-100">
                Search
              </Button>
            </div>
          </InputGroup>
        </div>
      </div>
      {<InputListItems />}
    </>
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
