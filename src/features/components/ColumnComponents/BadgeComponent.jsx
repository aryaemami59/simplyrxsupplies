import { Badge } from "react-bootstrap";
import { memo } from "react";
import { addedItemsLength } from "../../../addedSlice";
import { useAppSelector } from "../../../data/store";
const BadgeComponent = ({ vendorName }) => {
    const addedItemsLen = useAppSelector(addedItemsLength(vendorName));
    return (<Badge className="float-end" key={`${vendorName}-Badge-BadgeComponent`} bg={addedItemsLen ? "success" : "secondary"}>
      {addedItemsLen}
    </Badge>);
};
export default memo(BadgeComponent);
