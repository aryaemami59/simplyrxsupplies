import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SingleDropDown from "./SingleDropDown";

function VendorDropDown({
  officialVendorName,
  items,
  vendorName,
  onAdd,
  itemsAdded,
  classes,
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
                itemName={e.name}
                itemObj={e}
                items={items}
                itemsAdded={itemsAdded}
                classes={itemsAdded.includes(e) ? classes : ""}
                added={itemsAdded.includes(e) ? true : false}
              />
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

export default VendorDropDown;
