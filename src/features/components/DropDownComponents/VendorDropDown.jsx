import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SingleDropDown from "./SingleDropDown";

function VendorDropDown({
  officialVendorName,
  items,
  vendorName,
  onAdd,
  itemsAdded,
}) {
  return (
    <>
      <UncontrolledDropdown className="me-2">
        <DropdownToggle caret>{officialVendorName}</DropdownToggle>
        <DropdownMenu dark>
          {items
            .filter(e => e[vendorName])
            .map(e => (
              <SingleDropDown
                onAdd={onAdd}
                key={`${e.name}-${vendorName}`}
                itemObj={e}
                items={items}
                itemsAdded={itemsAdded}
              />
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

export default VendorDropDown;
