import { memo } from "react";
import Nav from "react-bootstrap/Nav";
import SideBarAccordionList from "./SideBarAccordionList";

function VerticalNavComponent({ items }) {
  return (
    <Nav
      className="flex-column overflow-auto w-100 h-100"
      style={{}}
      key={"sidebar nav component"}>
      <SideBarAccordionList
        className="bg-light accordion d-none d-lg-block"
        items={items}
        key={"sidebar accordion list"}
      />
    </Nav>
  );
}

export default memo(VerticalNavComponent);
