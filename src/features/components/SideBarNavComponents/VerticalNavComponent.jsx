import { memo } from "react";
import Nav from "react-bootstrap/Nav";
import SideBarAccordionList from "./SideBarAccordionList";

function VerticalNavComponent({ items }) {
  return (
    <Nav
      className="flex-column overflow-auto w-100 h-100 sticky-top c-overflow-x-hidden"
      style={{}}
      key={"sidebar nav component"}>
      <SideBarAccordionList
        className="bg-light accordion d-none d-lg-block sticky-top"
        items={items}
        key={"sidebar accordion list"}
      />
    </Nav>
  );
}

export default memo(VerticalNavComponent);
