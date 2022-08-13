import { useDispatch } from "react-redux";
import { removeItems } from "../../../addedSlice";
import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";


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
      size="2xl"
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
