import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  // DropdownItem,
} from "reactstrap";
import SingleDropDown from "./SingleDropDown";
import { useState, useEffect } from "react";

function VendorDropDown(props) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // console.log(added);
  }, [added]);
  return (
    <>
      <UncontrolledDropdown className="me-2">
        <DropdownToggle caret>{props.vendorName}</DropdownToggle>
        <DropdownMenu dark>
          {props.items
            .filter(e => e[props.vendorName])
            .map(e => (
              <SingleDropDown
                onAdd={props.onAdd}
                key={`${e.name}-${props.vendorName}`}
                itemName={e.name}
                itemObj={e}
                items={props.items}
                added={props.added}
                itemsAdded={props.itemsAdded}
                onEvent={props.onEvent}
                classes={props.itemsAdded.includes(e) ? props.classes : ""}
              />
              // <DropdownItem
              //   className={added ? "text-decoration-line-through" : ""}
              //   key={`${e.name}-${props.vendorName}`}
              //   onClick={() => {
              //     setAdded(!added);
              //     props.onAdd(e);
              //   }}>
              //   {e.name}
              // </DropdownItem>
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

export default VendorDropDown;
