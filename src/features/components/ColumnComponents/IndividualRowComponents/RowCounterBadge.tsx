import { Badge } from "@mui/material";
import { FC, memo } from "react";
import { VendorNameType } from "../../../../customTypes/types";
import { addedItemsLength } from "../../../../Redux/selectors";
import { useAppSelector } from "../../../../Redux/hooks";

type Props = {
  vendorName: VendorNameType;
};

const RowCounterBadge: FC<Props> = ({ vendorName }) => {
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

export default memo<Props>(RowCounterBadge);
