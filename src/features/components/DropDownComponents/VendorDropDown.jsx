import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SingleDropDown from "./SingleDropDown";

function VendorDropDown(props) {
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
                itemsAdded={props.itemsAdded}
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
