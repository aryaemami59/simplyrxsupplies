import { DropdownItem } from "reactstrap";

function SingleDropDown({ onAdd, itemObj, itemsAdded }) {
  return (
    <DropdownItem
      className={
        itemsAdded.includes(itemObj) ? "text-decoration-line-through" : ""
      }
      onClick={() => !itemsAdded.includes(itemObj) && onAdd(itemObj)}>
      {itemObj.name}
    </DropdownItem>
  );
}

export default SingleDropDown;
