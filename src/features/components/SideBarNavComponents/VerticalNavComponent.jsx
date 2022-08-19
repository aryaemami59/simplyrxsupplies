import { Nav } from "react-bootstrap";
import { memo } from "react";
import SideBarAccordionList from "./SideBarAccordionList";

function VerticalNavComponent() {
  return (
    <Nav
      className="flex-column overflow-auto w-100 h-100 sticky-top c-overflow-x-hidden"
      key={"sidebar nav component"}>
      <div
        key={`div-VerticalNavComponent`}
        className="bg-light accordion d-none d-lg-block sticky-top bg-dark">
        <SideBarAccordionList key={"sidebar accordion list"} />
      </div>
    </Nav>
  );
}

export default memo(VerticalNavComponent);
