import { Badge } from "@mui/material";
import { FC, memo } from "react";
import { vendorNameType } from "../../../../customTypes/types";
import { addedItemsLength } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";

type Props = {
  vendorName: vendorNameType;
};

const RowCounterBadge: FC<Props> = ({ vendorName }) => {
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));

  return (
    <span className="float-end">
      <Badge
        badgeContent={addedItemsLen}
        color="error"></Badge>
    </span>
  );
};

export default memo<Props>(RowCounterBadge);
