import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ListGroupItem, Button } from "reactstrap";
import { addItems, checkIfAddedToAllVendors } from "../../../addedSlice";

function SingleSideBarAccordionListItem({ targetId, itemObj }) {
  const dispatch = useDispatch();
  const ifAddedToAllVendors = useSelector(
    checkIfAddedToAllVendors(itemObj.vendors, itemObj)
  );

  // console.log(ifAddedToAllVendors);

  const clickHandler = useCallback(() => {
    dispatch(addItems(itemObj));
  }, [dispatch, itemObj]);

  return (
    <Button
      role="button"
      color={ifAddedToAllVendors ? "success" : "primary"}
      outline={ifAddedToAllVendors ? false : true}
      // disabled={ifAddedToAllVendors ? true : false}
      onClick={clickHandler}
      // className={ifAddedToAllVendors ? "bg-success text-white" : ""}
      key={`${itemObj.name}-${targetId}-ListGroupItem-sidebar`}>
      {itemObj.name}
    </Button>
  );
}

export default memo(SingleSideBarAccordionListItem);
