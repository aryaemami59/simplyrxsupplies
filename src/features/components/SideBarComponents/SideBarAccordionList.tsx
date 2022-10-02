import { shallowEqual } from "react-redux";
import { memo, FC } from "react";
import { selectCategoriesArr } from "../../../Redux/addedSlice";
import SideBarAccordion from "./SideBarAccordion";
import { useAppSelector } from "../../../Redux/hooks";

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
