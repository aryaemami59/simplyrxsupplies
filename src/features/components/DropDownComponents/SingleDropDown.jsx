import { DropdownItem } from "reactstrap";
import { useState, useEffect } from "react";

function SingleDropDown(props) {
  // const [added, setAdded] = useState(false);
  // console.log(props.itemsAdded);
  // const [classes, setClasses] = useState("");
  useEffect(() => {
    // props.added && setClasses("text-decoration-line-through");
    // props.itemsAdded.includes(props.itemObj) && setAdded(!added);
    // console.log(props.itemName, props.itemsAdded.includes(props.itemObj));
    // console.log(added);
    // props.itemsAdded.includes(props.itemObj) &&
    //   setClasses("text-decoration-line-through");
    // console.log("items changed");
    // console.log(props.itemsAdded);
    // console.log(classes);
    // console.log(added);
  }, [props.itemsAdded]);
  return (
    <>
      <DropdownItem
        // className={added == true ? "text-decoration-line-through" : ""}
        className={props.classes}
        // added={added.toString()}
        onClick={() => {
          // !props.itemsAdded.includes(props.itemObj) &&
          //   setClasses("text-decoration-line-through");
          // console.log(props.itemsAdded.includes(props.itemObj));
          // props.itemsAdded.includes(props.itemObj) && setAdded(!added);
          // !props.itemsAdded.includes(props.itemObj) &&
          //   setClasses("text-decoration-line-through");
          // props.onEvent();
          // setAdded(e => !e);
          props.onAdd(props.itemObj);
        }}>
        {props.itemName}
      </DropdownItem>
    </>
  );
}

export default SingleDropDown;
