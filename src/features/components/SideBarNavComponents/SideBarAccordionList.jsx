import { memo, useCallback, useState } from "react";
import { Accordion, Collapse } from "reactstrap";
import navList from "../../../data/navList";
import SideBarAccordion from "./SideBarAccordion";

const empty = [];

function SideBarAccordionList({ items }) {
  // const [open, setOpen] = useState(false);
  // const toggle = useCallback(() => {
  //   setOpen(prev => !prev);
  // }, []);
  // const [open, setOpen] = useState(empty);

  // const toggle = id => {
  //   if (open.includes(id)) {
  //     setOpen(prev => {
  //       const newOpen = prev.filter(e => e !== id);
  //       return newOpen.length ? newOpen : empty;
  //     });
  //   } else {
  //     setOpen(prev => prev.concat(id));
  //   }
  // };

  return (
    <div>
      {navList.map(e => (
        <SideBarAccordion
          items={items}
          targetId={e}
          key={`${e}-sidebaraccordion`}
        />
      ))}
    </div>
    // <Accordion
    //   open={open}
    //   toggle={toggle}
    //   key={`sidebar-accordion`}>
    //   {navList.map(e => (
    //     <SideBarAccordion
    //       items={items}
    //       targetId={e}
    //       key={`${e}-sidebaraccordion`}
    //     />
    //   ))}
    // </Accordion>
  );
}

export default memo(SideBarAccordionList);
