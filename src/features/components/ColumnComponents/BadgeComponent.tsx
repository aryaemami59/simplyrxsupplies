import { Badge } from "react-bootstrap";
import { FC, memo } from "react";
import { addedItemsLength } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import { vendorNameType } from "../../../customTypes/types";

type Props = {
  vendorName: vendorNameType;
};

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
