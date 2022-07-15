import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SingleDropDown from "./SingleDropDown";
// import { useState, useEffect } from "react";

function VendorDropDown(props) {
  // const [added, setAdded] = useState(false);
  // setAdded(true)
  // useEffect(() => {
  //   console.log(added);
  // }, [added]);
  // console.log("rendering VendorDropDown");
  return (
    <>
      <UncontrolledDropdown className="me-2">
        <DropdownToggle caret>{props.officialVendorName}</DropdownToggle>
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
                // addItem={() => props.itemsAdded.includes(e) && setAdded(true)}
                // added={added}
                // added={props.added}
                itemsAdded={props.itemsAdded}
                onEvent={props.onEvent}
                classes={props.itemsAdded.includes(e) ? props.classes : ""}
                added={props.itemsAdded.includes(e) ? true : false}
              />
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

export default VendorDropDown;
