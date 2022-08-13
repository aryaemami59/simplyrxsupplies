import { memo } from "react";
import { Accordion } from "react-bootstrap";
import navList from "../../../data/navList";
import SideBarAccordion from "./SideBarAccordion";

function SideBarAccordionList({ items }) {
  return (
    <>
      {navList.map(e => (
        <SideBarAccordion
          items={items}
          targetId={e}
          key={`${e}-side-bar-accordion`}
        />
      ))}
    </>
  );
}

export default memo(SideBarAccordionList);
