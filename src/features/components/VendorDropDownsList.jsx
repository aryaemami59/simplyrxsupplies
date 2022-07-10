import items from "../../app/items.json";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import VendorDropDown from "./VendorDropDown";
function VendorDropDownsList() {
  const vendors = [
    "McKesson",
    "OrderInsite",
    "GNFR",
    "signOrderCatalog",
    "vaxServe",
    "medSurge",
    "covap",
    "FORS",
  ];
  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown key={i} vendorName={e}></VendorDropDown>
      ))}
      {/* <UncontrolledDropdown className="me-2">
        <DropdownToggle caret>McKesson</DropdownToggle>
        <DropdownMenu>
          {items
            .filter(e => e.McKesson)
            .map((e, i) => (
              <DropdownItem key={`${e.name}-McKesson`}>{e.name}</DropdownItem>
            ))}
        </DropdownMenu>
      </UncontrolledDropdown> */}
    </>
  );
}

export default VendorDropDownsList;
