import { CardHeader } from "@mui/material";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";
import type { ItemName } from "../../types/api";
import { itemNames } from "../../types/api";

type Props = {
  itemName: ItemName;
};

const SearchResultsItemName: FC<Props> = ({ itemName }) => (
  <CardHeader
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    titleTypographyProps={{ className: "fs-5" }}
    className="p-1 p-lg-auto"
    title={itemName}
  />
);

SearchResultsItemName.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsItemName);
