import { DropdownItem } from "reactstrap";

function SingleDropDown(props) {
  // console.log("rendering SingleDropDown");
  return (
    <>
      <DropdownItem
        className={props.classes}
        onClick={() => props.onAdd(props.itemObj)}>
        {props.itemName}
      </DropdownItem>
    </>
  );
}

export default SingleDropDown;
