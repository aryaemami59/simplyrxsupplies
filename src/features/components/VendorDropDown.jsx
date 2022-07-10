import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import items from "../../app/items.json";

function VendorDropDown(props) {
  // const [vendorName, setVendorName] = useState()
  return (
    <>
      <UncontrolledDropdown className="me-2">
        <DropdownToggle caret>{props.vendorName}</DropdownToggle>
        <DropdownMenu>
          {items
            .filter(e => e[props.vendorName])
            .map(e => (
              <DropdownItem key={`${e.name}-${props.vendorName}`}>
                {e.name}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

export default VendorDropDown;
