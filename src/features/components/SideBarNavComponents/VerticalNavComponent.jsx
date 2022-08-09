import { memo } from "react";
import { Nav } from "reactstrap";
import SideBarAccordionList from "./SideBarAccordionList";

function VerticalNavComponent({ items }) {
  return (
    <Nav
      vertical
      className="overflow-auto w-100 h-100"
      style={{}}
      key={"sidebar nav component"}>
      <SideBarAccordionList
        // className="bg-dark bg-gradient"
        items={items}
        key={"sidebar accordion list"}
      />
    </Nav>
  );
}

export default memo(VerticalNavComponent);
