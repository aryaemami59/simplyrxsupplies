import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function VendorDropDown(props) {
  return (
    <>
      <UncontrolledDropdown className="me-2">
        <DropdownToggle caret>{props.vendorName}</DropdownToggle>
        <DropdownMenu dark>
          {props.items
            .filter(e => e[props.vendorName])
            .map(e => (
              <DropdownItem
                key={`${e.name}-${props.vendorName}`}
                onClick={() => props.onAdd(e)}>
                {e.name}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

export default VendorDropDown;
