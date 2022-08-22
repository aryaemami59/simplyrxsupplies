import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Overlay, Tooltip } from "react-bootstrap";
import { memo, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeItems } from "../../../addedSlice";
import PropTypes from "prop-types";

function RemoveButton({ vendorName, itemObj }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    dispatch(removeItems({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName]);

  const openTooltip = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <FontAwesomeIcon
        icon={faClose}
        aria-label="remove item"
        key={`${vendorName}-${itemObj.name}-CloseButton`}
        ref={target}
        // inverse
        onClick={clickHandler}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        className="btn rounded-circle hover-inverse"
        size="2xl"
        role="button"
      />
      <Overlay
        target={target.current}
        show={show}
        placement="top"
        key={`${vendorName}-RemoveButton-Overlay`}>
        {props => (
          <Tooltip
            key={`RemoveButton-tooltip-${vendorName}-${itemObj.name}`}
            id={`RemoveButton-tooltip-${vendorName}-${itemObj.name}`}
            {...props}>
            Click Here to Remove The Item
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

RemoveButton.propTypes = {
  vendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(RemoveButton);
