import { useDispatch } from "react-redux";
import { removeItems } from "../../../addedSlice";
import { memo, useCallback } from "react";
import { CloseButton } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faWindowMinimize } from "@fortawesome/free-regular-svg-icons";
// import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";

function RemoveButton({ vendorName, itemObj }) {
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    dispatch(removeItems({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName]);

  return (
    <FontAwesomeIcon
      icon={faClose}
      key={`${vendorName}-${itemObj.name}-CloseButton`}
      onClick={clickHandler}
      className="btn rounded-circle hover-inverse"
      size="2x"
      role="button"
    />
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
