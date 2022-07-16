import { DropdownItem } from "reactstrap";

function SingleDropDown(props) {
  return (
    <DropdownItem
      className={props.classes}
      onClick={() => !props.added && props.onAdd(props.itemObj)}>
      {props.itemName}
    </DropdownItem>
  );
}

export default SingleDropDown;
