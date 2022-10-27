import { Card } from "@mui/material";
import { FC, memo } from "react";
import { useAppSelector } from "../../../Redux/hooks";
import { checkIfAnyAddedToOneVendor } from "../../../Redux/selectors";
import useVendorName from "../../customHooks/useVendorName";
import ColumnTopCardBody from "./ColumnTopCardBody";
import EmptyColumn from "./EmptyColumn";

const VendorColumnCard: FC = () => {
  const vendorName = useVendorName();
  const anyAdded = useAppSelector(checkIfAnyAddedToOneVendor(vendorName));

  return <Card  >{anyAdded ? <ColumnTopCardBody /> : <EmptyColumn />}</Card>;
};

export default memo(VendorColumnCard);
