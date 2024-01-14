import Badge from "@mui/material/Badge";
import type { FC } from "react";
import { memo } from "react";

import useVendorId from "../../../hooks/useVendorId";
import { useCartItemsLength } from "../../../redux/selectors";

const RowCounterBadge: FC = () => {
  const vendorId = useVendorId();
  const addedItemsLength = useCartItemsLength(vendorId);

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
