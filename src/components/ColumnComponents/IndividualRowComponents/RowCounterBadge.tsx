import Badge from "@mui/material/Badge";
import type { FC } from "react";
import { memo } from "react";

import useVendorId from "../../../hooks/useVendorId";
import { useAppSelector } from "../../../redux/hooks";
import { selectCartItemsLength } from "../../../redux/selectors";

const RowCounterBadge: FC = () => {
  const vendorId = useVendorId();
  const addedItemsLength = useAppSelector(state =>
    selectCartItemsLength(state, vendorId)
  );

  return (
    <span className="float-end">
      <Badge
        badgeContent={addedItemsLength}
        color="error"
      />
    </span>
  );
};

export default memo(RowCounterBadge);
