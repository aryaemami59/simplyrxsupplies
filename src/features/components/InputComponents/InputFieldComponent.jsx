import { Form } from "react-bootstrap";
import { memo, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { selectAllItems, setListItems } from "../../../addedSlice";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Alert } from "react-bootstrap";

const empty = [];

function InputFieldComponent() {
  const items = useSelector(selectAllItems);
  // const isLoading = useSelector(state => state.item.isLoading);
  // const errMsg = useSelector(state => state.item.errMsg);
  const dispatch = useDispatch();
  const [val, setVal] = useState("");

  const listItemsFunc = useCallback(
    e => {
      const trimmedValue = e.target.value.trim().toLowerCase();
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().includes(trimmedValue))
            .slice(0, 100)
        : empty;
    },
    [items]
  );

  const changeVal = useCallback(
    e => {
      const listItems = listItemsFunc(e);
      setVal(e.target.value);

      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  // if (isLoading) {
  //   return (
  //     <div className="d-flex justify-content-center">
  //       <Spinner
  //         animation="border"
  //         role="status"
  //         className="my-5"
  //         variant="info"
  //         style={{ width: "10rem", height: "10rem", borderWidth: "1rem" }}>
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }

  // if (errMsg) {
  //   return (
  //     <div className="justify-content-center d-flex mt-5 w-100">
  //       <Alert variant="danger" className="w-75">
  //         <Alert.Heading className="fs-1">
  //           Oh snap! You got an error!
  //         </Alert.Heading>
  //         <p className="fs-2">
  //           Looks like there was a problem loading the page. Either refresh the
  //           page or try again later.
  //         </p>
  //       </Alert>
  //     </div>
  //   );
  // }

  return (
    <Form.Control
      placeholder="Search..."
      type="search"
      className="rounded-pill ps-4 mt-3 mb-5 text-white border-0 c-bg"
      key="input box"
      onChange={changeVal}
      value={val}
    />
  );
}

InputFieldComponent.propTypes = {
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

export default memo(InputFieldComponent);
