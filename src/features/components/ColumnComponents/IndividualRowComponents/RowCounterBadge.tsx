import { FC, memo } from "react";
import { Badge } from "react-bootstrap";
import { vendorNameType } from "../../../../customTypes/types";
import { addedItemsLength } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";

type Props = {
  vendorName: vendorNameType;
};

const RowCounterBadge: FC<Props> = ({ vendorName }) => {
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));

  return (
    <Badge
      className="float-end"
      key={`${vendorName}-Badge-BadgeComponent`}
      bg={addedItemsLen ? "success" : "secondary"}>
      {addedItemsLen}
    </Badge>
  );
};

export default memo<Props>(RowCounterBadge);
