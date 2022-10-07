import { FC, memo } from "react";
import { ListGroup } from "react-bootstrap";

const EmptyColumn: FC = () => {
  return (
    <ListGroup.Item variant="danger">
      "No Item Has Been Added Yet!"
    </ListGroup.Item>
  );
};

export default memo(EmptyColumn);
