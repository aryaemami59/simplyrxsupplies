import { shallowEqual } from "react-redux";
import { memo } from "react";
import { selectNavsArr } from "../../../addedSlice";
import SideBarAccordion from "./SideBarAccordion";
import { useAppSelector } from "../../../data/store";
const SideBarAccordionList = () => {
    const navList = useAppSelector(selectNavsArr, shallowEqual);
    return (<>
      {navList.map((e) => (<SideBarAccordion category={e} key={`${e}-SideBarAccordion-SideBarAccordionList`}/>))}
    </>);
};
export default memo(SideBarAccordionList);
