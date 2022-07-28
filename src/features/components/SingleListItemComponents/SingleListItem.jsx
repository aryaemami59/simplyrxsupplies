import { ListGroupItem } from "reactstrap";
import { memo, useCallback } from "react";

function SingleListItem({ itemsAdded, onAdd, itemObj }) {
  const clickHandler = useCallback(() => {
    return !itemsAdded.includes(itemObj) && onAdd(itemObj);
  }, []);

  return (
    <ListGroupItem
      role="button"
      className={
        itemsAdded.includes(itemObj) ? "text-decoration-line-through" : ""
      }
      onClick={clickHandler}>
      {itemObj.name}
    </ListGroupItem>
  );
}

export default memo(SingleListItem);
// export default memo(
//   SingleListItem,
//   (prev, next) => prev.itemsAdded.length === next.itemsAdded.length
// );
