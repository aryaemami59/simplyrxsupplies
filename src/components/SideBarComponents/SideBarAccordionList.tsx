import type { FC } from "react";
import { memo } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../Redux/hooks";
import { selectCategoriesArr } from "../../Redux/selectors";
import SideBarAccordionCategories from "./SideBarAccordionCategories";

const SideBarAccordionList: FC = () => {
  const categoryList = useAppSelector(selectCategoriesArr, shallowEqual);

  return (
    <>
      {categoryList.map(category => (
        <SideBarAccordionCategories
          category={category}
          key={`${category}-SideBarAccordion-SideBarAccordionList`}
        />
      ))}
    </>
  );
};

export default memo(SideBarAccordionList);
