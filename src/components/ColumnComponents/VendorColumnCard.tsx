import Card from "@mui/material/Card";
import type { FC } from "react";
import { memo } from "react";

import useVendorName from "../../hooks/useVendorName";
import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyAddedToOneVendor } from "../../redux/selectors";
import ColumnTopCardBody from "./ColumnTopCardBody";
import EmptyColumn from "./EmptyColumn";

const VendorColumnCard: FC = () => {
  const vendorName = useVendorName();
  const anyAdded = useAppSelector(checkIfAnyAddedToOneVendor(vendorName));

  return <Card>{anyAdded ? <ColumnTopCardBody /> : <EmptyColumn />}</Card>;
};

export default memo(VendorColumnCard);
