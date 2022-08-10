import { memo } from "react";
import navList from "../../../data/navList";
import SideBarAccordion from "./SideBarAccordion";

function SideBarAccordionList({ items }) {
  return (
    <div>
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
