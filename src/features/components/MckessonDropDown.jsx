import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import items from "../../app/items.json";
function MckessonDropDown() {
  return (
    <>
      <UncontrolledDropdown className="me-2">
        <DropdownToggle caret>McKesson</DropdownToggle>
        <DropdownMenu>
          {items
            .filter(e => e.McKesson)
            .map((e, i) => (
              <DropdownItem key={`${e.name}-McKesson`}>{e.name}</DropdownItem>
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

export default MckessonDropDown;
