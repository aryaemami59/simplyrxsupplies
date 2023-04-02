import Badge from "@mui/material/Badge";
import type { FC } from "react";
import { memo } from "react";
import useVendorName from "../../../hooks/useVendorName";
import { useAppSelector } from "../../../redux/hooks";
import { addedItemsLength } from "../../../redux/selectors";

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
