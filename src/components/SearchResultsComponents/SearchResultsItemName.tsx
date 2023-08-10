import type { CardHeaderProps } from "@mui/material/CardHeader";
import CardHeader from "@mui/material/CardHeader";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";

import type { ItemName } from "../../types/aa";
import { itemNames } from "../../types/aa";

type Props = {
  itemName: ItemName;
};

const titleTypographyProps: CardHeaderProps["titleTypographyProps"] = {
  className: "fs-5",
} as const;

const SearchResultsItemName: FC<Props> = ({ itemName }) => (
  <CardHeader
    className="p-1 p-lg-auto"
    title={itemName}
    titleTypographyProps={titleTypographyProps}
  />
);

SearchResultsItemName.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsItemName);
