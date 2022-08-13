import { memo } from "react";
import navList from "../../../data/navList";
import SideBarAccordion from "./SideBarAccordion";
import PropTypes from "prop-types";

function SideBarAccordionList({ items }) {
  return (
    <>
      {navList.map(e => (
        <SideBarAccordion
          items={items}
          targetId={e}
          key={`${e}-side-bar-accordion`}
        />
      ))}
    </>
  );
}

SideBarAccordionList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(SideBarAccordionList);
