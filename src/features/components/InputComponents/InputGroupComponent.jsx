import InputListItems from "./InputListItems";
import React, { memo } from "react";
import PropTypes from "prop-types";
import InputFieldComponent from "./InputFieldComponent";
import { InputGroup } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Button } from "react-bootstrap";

function InputGroupComponent({ items }) {
  return (
    <>
      <div>
        <div className="row">
          <InputGroup size="lg" className="my-4" key="Input Group">
            <div className="p-0 col-md-10">
              <FloatingLabel
                key="input label"
                controlId="search input field"
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
