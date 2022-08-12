import { memo } from "react";
import { Accordion } from "react-bootstrap";
import navList from "../../../data/navList";
import SideBarAccordion from "./SideBarAccordion";

function SideBarAccordionList({ items }) {
  return (
    <div className="bg-light">
      {navList.map(e => (
        <SideBarAccordion
          items={items}
          targetId={e}
          key={`${e}-side-bar-accordion`}
        />
      ))}
    </div>
  );
}

export default memo(SideBarAccordionList);
