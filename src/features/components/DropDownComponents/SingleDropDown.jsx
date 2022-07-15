import { DropdownItem } from "reactstrap";
// import { useState } from "react";

function SingleDropDown(props) {
  // const [added, setAdded] = useState(false);
  // console.log(props.added);
  return (
    <DropdownItem
      className={props.classes}
      onClick={() => !props.added && props.onAdd(props.itemObj)}>
      {props.itemName}
    </DropdownItem>
  );
}

export default SingleDropDown;
