import { DropdownItem } from "reactstrap";

function SingleDropDown({ classes, added, onAdd, itemObj, itemName }) {
  return (
    <DropdownItem className={classes} onClick={() => !added && onAdd(itemObj)}>
      {itemName}
    </DropdownItem>
  );
}

export default SingleDropDown;
