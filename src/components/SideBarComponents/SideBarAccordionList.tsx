import type { FC } from "react";
import { memo } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectCategoriesArr } from "../../redux/selectors";
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
