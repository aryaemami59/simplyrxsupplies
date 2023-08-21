import Card from "@mui/material/Card";
import type { FC } from "react";
import { memo } from "react";

import useVendorId from "../../hooks/useVendorId";
import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyAddedToOneVendor } from "../../redux/selectors";
import ColumnTopCardBody from "./ColumnTopCardBody";
import EmptyColumn from "./EmptyColumn";

const VendorColumnCard: FC = () => {
  const vendorId = useVendorId();
  const anyAdded = useAppSelector(state =>
    checkIfAnyAddedToOneVendor(state, vendorId)
  );

  return <Card>{anyAdded ? <ColumnTopCardBody /> : <EmptyColumn />}</Card>;
};

export default memo(VendorColumnCard);
