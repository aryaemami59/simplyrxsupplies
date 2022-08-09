import { memo, useState } from "react";
import { Accordion } from "reactstrap";
import navList from "../../../data/navList";
import SideBarAccordion from "./SideBarAccordion";

const empty = [];

function SideBarAccordionList({ items }) {
  const [open, setOpen] = useState(empty);
  // const renders = useRef(0);
  // console.log("renders:", renders.current++);

  const toggle = id => {
    if (open.includes(id)) {
      setOpen(prev => {
        const newOpen = prev.filter(e => e !== id);
        return newOpen.length ? newOpen : empty;
      });
    } else {
      setOpen(prev => prev.concat(id));
    }
  };

  return (
    <Accordion
      // className="bg-dark bg-gradient"
      open={open}
      toggle={toggle}
      key={`sidebar-accordion`}>
      {navList.map(e => (
        <SideBarAccordion
          items={items}
          targetId={e}
          key={`${e}-sidebaraccordion`}
        />
      ))}
    </Accordion>
  );
}

export default memo(SideBarAccordionList);
