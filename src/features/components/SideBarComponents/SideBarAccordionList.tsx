import { FC, memo } from "react";
import { shallowEqual } from "react-redux";
import { selectCategoriesArr } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import SideBarAccordion from "./SideBarAccordion";

const SideBarAccordionList: FC = (): JSX.Element => {
  const categoryList = useAppSelector(selectCategoriesArr, shallowEqual);

  return (
    <>
      {categoryList.map(category => (
        <SideBarAccordion
          category={category}
          key={`${category}-SideBarAccordion-SideBarAccordionList`}
        />
      ))}
    </>
  );
};

export default memo(SideBarAccordionList);
