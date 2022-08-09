import { CloseButton } from "reactstrap";
import { useDispatch } from "react-redux";
import { removeItems } from "../../../addedSlice";
import { memo, useCallback } from "react";

function RemoveButton({ vendorName, itemObj }) {
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    dispatch(removeItems({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName]);

  return (
    <CloseButton
      key={`${vendorName}-${itemObj.name}-CloseButton`}
      onClick={clickHandler}
    />
  );
}

export default memo(RemoveButton);
