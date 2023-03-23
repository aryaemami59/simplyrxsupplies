import Badge from "@mui/material/Badge";
import type { FC } from "react";
import { memo } from "react";
import useVendorName from "../../../hooks/useVendorName";
import { useAppSelector } from "../../../Redux/hooks";
import { addedItemsLength } from "../../../Redux/selectors";

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
