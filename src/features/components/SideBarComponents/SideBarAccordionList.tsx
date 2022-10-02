import { shallowEqual } from "react-redux";
import { memo, FC } from "react";
import { selectNavsArr } from "../../../Redux/addedSlice";
import SideBarAccordion from "./SideBarAccordion";
import { useAppSelector } from "../../../Redux/hooks";

const SideBarAccordionList: FC = (): JSX.Element => {
  const navList = useAppSelector(selectNavsArr, shallowEqual);

  return (
    <>
      {navList.map(category => (
        <SideBarAccordion
          category={category}
          key={`${category}-SideBarAccordion-SideBarAccordionList`}
        />
      ))}
    </>
  );
};

export default memo(SideBarAccordionList);
