import { Card } from "@mui/material";
import { FC, memo } from "react";
import { VendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import { checkIfAnyAddedToOneVendor } from "../../../Redux/selectors";
import ColumnTopCardBody from "./ColumnTopCardBody";
import EmptyColumn from "./EmptyColumn";

type Props = {
  vendorName: VendorNameType;
};

const VendorColumnCard: FC<Props> = ({ vendorName }) => {
  const anyAdded = useAppSelector(checkIfAnyAddedToOneVendor(vendorName));

  return (
    <Card>
      {anyAdded ? (
        <ColumnTopCardBody vendorName={vendorName} />
      ) : (
        <EmptyColumn />
      )}
    </Card>
  );
};

export default memo<Props>(VendorColumnCard);
