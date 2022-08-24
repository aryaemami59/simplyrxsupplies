import { useSelector, shallowEqual } from "react-redux";
import { memo, FC } from "react";
import { selectNavsArr } from "../../../addedSlice";
import SideBarAccordion from "./SideBarAccordion";

const SideBarAccordionList: FC = (): JSX.Element => {
  const navList = useSelector(selectNavsArr, shallowEqual);

  return (
    <>
      {navList.map((e) => (
        <SideBarAccordion
          category={e}
          key={`${e}-SideBarAccordion-SideBarAccordionList`}
        />
      ))}
    </>
  );
};

export default memo(SideBarAccordionList);
