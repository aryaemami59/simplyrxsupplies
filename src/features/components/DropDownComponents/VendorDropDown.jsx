import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SingleDropDown from "./SingleDropDown";

function VendorDropDown(props) {
  // console.log("rendering VendorDropDown");
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
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

export default VendorDropDown;
