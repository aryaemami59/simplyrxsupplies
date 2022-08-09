import { memo } from "react";
import { ListGroupItem } from "reactstrap";

function SingleSideBarAccordionListItem({ items, targetId, itemObj }) {
  return (
    <ListGroupItem key={`${itemObj.name}-${targetId}-ListGroupItem-sidebar`}>
      {itemObj.name}
    </ListGroupItem>
  );
}

export default memo(SingleSideBarAccordionListItem);
