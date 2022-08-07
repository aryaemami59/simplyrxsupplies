import { CloseButton } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectByVendor, removeItems } from "../../../addedSlice";

function RemoveButton({ vendorName, itemObj }) {
  const dispatch = useDispatch();
  const addedItems = useSelector(selectByVendor(vendorName));

  function clickHandler() {
    addedItems.includes(itemObj) &&
      dispatch(removeItems({ itemObj, vendorName }));
  }

  return (
    <CloseButton
      key={`${vendorName}-${itemObj.name}-CloseButton`}
      onClick={clickHandler}></CloseButton>
  );
}

export default RemoveButton;
