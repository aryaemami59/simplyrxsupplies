import { Badge } from "@mui/material";
import { FC, memo } from "react";
import { useAppSelector } from "../../../../Redux/hooks";
import { addedItemsLength } from "../../../../Redux/selectors";
import useVendorName from "../../../hooks/useVendorName";

const RowCounterBadge: FC = () => {
  const vendorName = useVendorName();
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));

  return (
    <span className="float-end">
      <Badge
        badgeContent={addedItemsLen}
        color="error"
      />
    </span>
  );
};

export default memo(RowCounterBadge);
