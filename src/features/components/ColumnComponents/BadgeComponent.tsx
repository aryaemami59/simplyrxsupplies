import { Badge } from "react-bootstrap";
import { FC, memo } from "react";
import { addedItemsLength } from "../../../addedSlice";
import { useAppSelector } from "../../../data/store";

interface Props {
  vendorName: string;
}

const BadgeComponent: FC<Props> = ({ vendorName }): JSX.Element => {
  const addedItemsLen: number = useAppSelector<number>(
    addedItemsLength(vendorName)
  );

  return (
    <Badge
      className="float-end"
      key={`${vendorName}-Badge-BadgeComponent`}
      bg={addedItemsLen ? "success" : "secondary"}>
      {addedItemsLen}
    </Badge>
  );
};

export default memo<Props>(BadgeComponent);
