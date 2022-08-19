import { useSelector, shallowEqual } from "react-redux";
import { memo } from "react";
import { selectNavsArr } from "../../../addedSlice";
import SideBarAccordion from "./SideBarAccordion";

function SideBarAccordionList() {
  const navList = useSelector(selectNavsArr, shallowEqual);

  return (
    <>
      {navList.map(e => (
        <SideBarAccordion
          category={e}
          key={`${e}-SideBarAccordion-SideBarAccordionList`}
        />
      ))}
    </>
  );
}

export default memo(SideBarAccordionList);
